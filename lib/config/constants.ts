/**
 * Constantes globales del proyecto
 */

/**
 * Configuración de la aplicación
 */
export const APP_CONFIG = {
  name: 'Sistema Nettalco',
  version: '1.0.0',
  defaultLocale: 'es-PE',
  defaultTimezone: 'America/Lima',
} as const;

/**
 * Configuración de paginación
 */
export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

/**
 * Tiempos de espera y delays
 */
export const TIMEOUTS = {
  debounce: 300,
  apiTimeout: 30000,
  toastDuration: 3000,
} as const;

/**
 * Claves de localStorage
 */
export const STORAGE_KEYS = {
  theme: 'app-theme',
  sidebarCollapsed: 'sidebar-collapsed',
  userPreferences: 'user-preferences',
} as const;

/**
 * Rutas de la aplicación
 */
export const ROUTES = {
  home: '/inicio',
  login: '/login',
  error: '/error',
  accessDenied: '/error/acceso-denegado',
  notFound: '/not-found',
} as const;

/**
 * Códigos de permisos comunes
 */
export const PERMISSIONS = {
  view: 'VIEW',
  create: 'CREATE',
  edit: 'EDIT',
  delete: 'DELETE',
  admin: 'ADMIN',
} as const;
