/**
 * Permissions module - Sistema de permisos para Server Components
 * 
 * IMPORTANTE: Estas funciones solo funcionan en Server Components,
 * Server Actions o Route Handlers.
 */

export {
  getPermissionsForSection,
  getPermissionsBySectionCode,
  canAccessModulo,
  canReadModulo,
  canWriteModulo,
  canUpdateModulo,
  canDeleteModulo,
  getAccessibleModules,
  getFirstAccessibleModule,
  hasPermissionForModulo,
  clearPermisosCache,
} from './permissions';

export type { Permiso, ModuloPermisos, PermissionsState, PermisosResponse } from './types';
