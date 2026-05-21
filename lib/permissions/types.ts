/**
 * Tipos para el sistema de permisos
 */

export interface Permiso {
  id: number;
  codigo: string;
  permisos?: {
    leer?: boolean;
    crear?: boolean;
    actualizar?: boolean;
    eliminar?: boolean;
  };
}

export interface ModuloPermisos {
  modulo: {
    id: number;
    codigo: string;
  };
  permisos: string[];
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canUpdate: boolean;
}

export interface PermissionsState {
  loading: boolean;
  loaded: boolean;
  modulosPermisos: ModuloPermisos[];
  permisosGenerales: string[];
  error: string | null;
}

export interface PermisosResponse {
  success: boolean;
  data: Permiso[];
  message?: string;
}
