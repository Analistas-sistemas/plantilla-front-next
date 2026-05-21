/**
 * Menu module - Sistema de menú y navegación
 */

export {
  getMenuItems,
  getSistemaNombre,
  getSectionAndSubsectionIds,
  clearMenuCache,
} from './menu-loader';

export { getIconByCodigo, MENU_ICON_CONFIG } from './icon-mapping';

export type {
  MenuResponse,
  MenuData,
  Seccion,
  Subseccion,
  MenuItem,
  MenuItemData,
} from './types';
