import { apiClient } from '@/lib/api/client';
import { getSectionAndSubsectionIds } from '@/lib/menu/menu-loader';
import type { Permiso, ModuloPermisos, PermissionsState, PermisosResponse } from './types';

/**
 * Cache de permisos en memoria (server-side)
 */
interface PermisosCache {
  data: PermissionsState;
  timestamp: number;
}

const permisosCache = new Map<string, PermisosCache>();
const PERMISOS_CACHE_TTL = 5 * 60 * 1000; // 5 minutos

/**
 * Verifica si el cache de permisos es válido
 */
function isPermisosCacheValid(cacheKey: string): boolean {
  const cached = permisosCache.get(cacheKey);
  if (!cached) return false;
  return Date.now() - cached.timestamp < PERMISOS_CACHE_TTL;
}

/**
 * Limpia el cache de permisos
 */
export function clearPermisosCache(section?: number, subsection?: number): void {
  if (section && subsection) {
    const cacheKey = `${section}-${subsection}`;
    permisosCache.delete(cacheKey);
  } else {
    permisosCache.clear();
  }
}

/**
 * Procesa los permisos del backend en el formato interno
 */
function processModulosPermisos(permisosBackend: Permiso[] = []): ModuloPermisos[] {
  return permisosBackend.map((permisoModulo) => {
    const modulo = {
      id: permisoModulo.id,
      codigo: permisoModulo.codigo,
    };

    const permisos = permisoModulo.permisos || {};

    return {
      modulo,
      permisos: [permisoModulo.codigo],
      canRead: permisos.leer || false,
      canWrite: permisos.crear || false,
      canDelete: permisos.eliminar || false,
      canUpdate: permisos.actualizar || false,
    };
  });
}

/**
 * Obtiene los permisos por sección y subsección desde el servidor
 */
async function fetchPermisosBySectionAndSubsection(
  section: number,
  subsection: number
): Promise<Permiso[]> {
  try {
    const response = await apiClient.get<PermisosResponse>(
      `/api/v1/permisos/section/${section}/subsection/${subsection}`
    );

    return response.data || [];
  } catch (error) {
    console.error('Error cargando permisos:', error);
    throw error;
  }
}

/**
 * Obtiene los permisos para una sección y subsección específica (con cache)
 * Server-only function
 */
export async function getPermissionsForSection(
  sectionId: number,
  subsectionId: number
): Promise<PermissionsState> {
  const cacheKey = `${sectionId}-${subsectionId}`;

  // Verificar cache
  if (isPermisosCacheValid(cacheKey)) {
    const cached = permisosCache.get(cacheKey);
    if (cached) {
      return cached.data;
    }
  }

  try {
    const permisos = await fetchPermisosBySectionAndSubsection(sectionId, subsectionId);
    const permisosGenerales = permisos.map((p) => p.codigo);
    const modulosPermisos = processModulosPermisos(permisos);

    const state: PermissionsState = {
      loading: false,
      loaded: true,
      modulosPermisos,
      permisosGenerales,
      error: null,
    };

    // Guardar en cache
    permisosCache.set(cacheKey, {
      data: state,
      timestamp: Date.now(),
    });

    return state;
  } catch (error) {
    const errorState: PermissionsState = {
      loading: false,
      loaded: true,
      modulosPermisos: [],
      permisosGenerales: [],
      error: 'Error cargando permisos del servidor',
    };

    return errorState;
  }
}

/**
 * Obtiene permisos por código de sección y subsección
 */
export async function getPermissionsBySectionCode(
  sectionCode: string,
  subsectionCode: string
): Promise<PermissionsState> {
  try {
    const { sectionId, subsectionId } = await getSectionAndSubsectionIds(
      sectionCode,
      subsectionCode
    );
    return await getPermissionsForSection(sectionId, subsectionId);
  } catch (error) {
    console.error('Error obteniendo IDs de sección y subsección:', error);
    return {
      loading: false,
      loaded: true,
      modulosPermisos: [],
      permisosGenerales: [],
      error: 'Error obteniendo IDs de sección y subsección',
    };
  }
}

/**
 * Verifica si el usuario puede acceder a un módulo específico
 */
export function canAccessModulo(
  modulosPermisos: ModuloPermisos[],
  moduloCodigo: string
): boolean {
  const moduloPermisos = modulosPermisos.find((mp) => mp.modulo.codigo === moduloCodigo);

  if (!moduloPermisos) {
    return false;
  }

  return (
    moduloPermisos.canRead || moduloPermisos.canWrite || moduloPermisos.canUpdate
  );
}

/**
 * Verifica si el usuario puede leer un módulo específico
 */
export function canReadModulo(
  modulosPermisos: ModuloPermisos[],
  moduloCodigo: string
): boolean {
  const moduloPermisos = modulosPermisos.find((mp) => mp.modulo.codigo === moduloCodigo);
  return moduloPermisos?.canRead || false;
}

/**
 * Verifica si el usuario puede escribir en un módulo específico
 */
export function canWriteModulo(
  modulosPermisos: ModuloPermisos[],
  moduloCodigo: string
): boolean {
  const moduloPermisos = modulosPermisos.find((mp) => mp.modulo.codigo === moduloCodigo);
  return moduloPermisos?.canWrite || false;
}

/**
 * Verifica si el usuario puede actualizar un módulo específico
 */
export function canUpdateModulo(
  modulosPermisos: ModuloPermisos[],
  moduloCodigo: string
): boolean {
  const moduloPermisos = modulosPermisos.find((mp) => mp.modulo.codigo === moduloCodigo);
  return moduloPermisos?.canUpdate || false;
}

/**
 * Verifica si el usuario puede eliminar en un módulo específico
 */
export function canDeleteModulo(
  modulosPermisos: ModuloPermisos[],
  moduloCodigo: string
): boolean {
  const moduloPermisos = modulosPermisos.find((mp) => mp.modulo.codigo === moduloCodigo);
  return moduloPermisos?.canDelete || false;
}

/**
 * Obtiene todos los módulos accesibles
 */
export function getAccessibleModules(modulosPermisos: ModuloPermisos[]): ModuloPermisos[] {
  return modulosPermisos.filter((mp) => canAccessModulo(modulosPermisos, mp.modulo.codigo));
}

/**
 * Encuentra el primer módulo accesible
 */
export function getFirstAccessibleModule(
  modulosPermisos: ModuloPermisos[]
): ModuloPermisos | null {
  const accessible = getAccessibleModules(modulosPermisos);
  return accessible.length > 0 ? accessible[0] : null;
}

/**
 * Verifica permisos generales (para compatibilidad con código existente)
 */
export function hasPermissionForModulo(
  permisosGenerales: string[],
  moduloCodigo: string,
  permiso: string
): boolean {
  return permisosGenerales.some(
    (p) =>
      p === `${moduloCodigo}_${permiso}` ||
      p === `${moduloCodigo}_${permiso.toUpperCase()}` ||
      p === permiso ||
      p === permiso.toUpperCase()
  );
}
