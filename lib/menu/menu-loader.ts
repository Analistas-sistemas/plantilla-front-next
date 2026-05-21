import { apiClient } from '@/lib/api/client';
import { getIconByCodigo } from './icon-mapping';
import { mapBackendRoute } from './route-mapping';
import type { MenuResponse, MenuItem, Seccion, Subseccion, MenuData, MenuItemData } from './types';

/**
 * Cache del menú en memoria (server-side)
 */
interface MenuCache {
  data: MenuItem[];
  timestamp: number;
  sistemaNombre: string;
}

let menuCache: MenuCache | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutos

/**
 * Verifica si el cache es válido
 */
function isCacheValid(): boolean {
  if (!menuCache) return false;
  return Date.now() - menuCache.timestamp < CACHE_TTL;
}

/**
 * Limpia el cache del menú
 */
export function clearMenuCache(): void {
  menuCache = null;
}

/**
 * Ordena items por su propiedad orden
 */
function sortByOrder<T extends { orden: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.orden - b.orden);
}

/**
 * Crea un MenuItem para una subsección
 */
function createSubseccionMenuItem(
  subseccion: Subseccion,
  seccionId: number,
  sistemaId: number
): MenuItem {
  const menuItem: MenuItem = {
    id: subseccion.id.toString(),
    label: subseccion.nombre,
    icon: getIconByCodigo(subseccion.codigo),
    data: {
      subseccion: {
        ...subseccion,
        parent_seccion_id: seccionId,
        sistema_id: sistemaId,
      },
      parentId: seccionId,
    },
  };

  // Mapear la ruta del backend a la ruta de Next.js
  if (subseccion.ruta) {
    const mappedRoute = mapBackendRoute(subseccion.ruta);
    menuItem.href = mappedRoute;
  } else {
    menuItem.href = '/inicio';
  }

  return menuItem;
}

/**
 * Crea MenuItems para subsecciones
 */
function createSubseccionMenuItems(seccion: Seccion, sistemaId: number): MenuItem[] {
  if (!seccion.subsecciones?.length) return [];

  return sortByOrder(seccion.subsecciones).map((subseccion) =>
    createSubseccionMenuItem(subseccion, seccion.id, sistemaId)
  );
}

/**
 * Crea un MenuItem para una sección
 */
function createSeccionMenuItem(seccion: Seccion, sistema: MenuData): MenuItem {
  const menuItem: MenuItem = {
    id: seccion.id.toString(),
    label: seccion.nombre,
    icon: getIconByCodigo(seccion.codigo),
    data: {
      seccion: {
        ...seccion,
        subsecciones: seccion.subsecciones || [],
        sistema_id: sistema.sistema_id,
        sistema_codigo: sistema.sistema_codigo,
        sistema_nombre: sistema.sistema_nombre,
      },
    },
  };

  if (seccion.subsecciones?.length) {
    menuItem.items = createSubseccionMenuItems(seccion, sistema.sistema_id);
  }

  return menuItem;
}

/**
 * Procesa la respuesta del menú desde el backend
 */
function processMenuResponse(response: MenuResponse): {
  menuItems: MenuItem[];
  sistemaNombre: string;
} {
  if (!response.success) {
    throw new Error(response.message || 'Error al obtener menú');
  }

  const sistemaNombre = response.data[0]?.sistema_nombre || '';

  const menuItems = response.data.flatMap((sistema) =>
    sortByOrder(sistema.secciones).map((seccion) =>
      createSeccionMenuItem(seccion, sistema)
    )
  );

  return { menuItems, sistemaNombre };
}

/**
 * Obtiene el menú desde el servidor
 * Server-only function (usa cookies automáticamente)
 */
export async function getMenuItems(): Promise<MenuItem[]> {
  // Verificar cache
  if (isCacheValid() && menuCache) {
    return menuCache.data;
  }

  try {
    const response = await apiClient.get<MenuResponse>('/api/v1/permisos/navegacion');

    const { menuItems, sistemaNombre } = processMenuResponse(response);

    // Guardar en cache
    menuCache = {
      data: menuItems,
      timestamp: Date.now(),
      sistemaNombre,
    };

    return menuItems;
  } catch (error) {
    // En desarrollo es normal no tener autenticación - retornar array vacío silenciosamente
    if (process.env.NODE_ENV !== 'development') {
      console.error('Error al obtener menú:', error);
    }
    return [];
  }
}

/**
 * Obtiene el nombre del sistema desde el cache o servidor
 */
export async function getSistemaNombre(): Promise<string> {
  if (isCacheValid() && menuCache) {
    return menuCache.sistemaNombre;
  }

  try {
    await getMenuItems(); // Cargar menú si no existe
    return menuCache?.sistemaNombre || 'Sistema';
  } catch (error) {
    console.error('Error al obtener nombre del sistema:', error);
    return 'Sistema';
  }
}

/**
 * Busca IDs de sección y subsección por código
 */
export async function getSectionAndSubsectionIds(
  sectionCode: string,
  subsectionCode: string
): Promise<{ sectionId: number; subsectionId: number }> {
  const menuItems = await getMenuItems();

  for (const menuItem of menuItems) {
    if (menuItem.data?.seccion?.codigo === sectionCode) {
      const sectionId = menuItem.data.seccion.id;

      if (menuItem.items) {
        for (const subItem of menuItem.items) {
          if (subItem.data?.subseccion?.codigo === subsectionCode) {
            const subsectionId = subItem.data.subseccion.id;
            return { sectionId, subsectionId };
          }
        }
      }
    }
  }

  throw new Error(
    `No se encontró la sección ${sectionCode} o subsección ${subsectionCode}`
  );
}
