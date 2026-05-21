/**
 * Mapeo de íconos para secciones y subsecciones del menú
 * Usa lucide-react icons
 * Los códigos están en mayúsculas según el backend
 */

export const MENU_ICON_CONFIG = {
  secciones: {
    // Secciones del backend
    'INICIO': 'home',
    'UIKIT': 'palette',
    'PAGES': 'file-text',
    'REPORTES': 'file-bar-chart',
    
    // Secciones comunes (lowercase para compatibilidad)
    'home': 'home',
    'inicio': 'home',
    'dashboard': 'layout-dashboard',
    'admin': 'settings',
    'administracion': 'settings',
    'reportes': 'file-bar-chart',
    'configuracion': 'settings',
    'usuarios': 'users',
  } as Record<string, string>,

  subsecciones: {
    // Subsecciones del backend - INICIO
    'ACCESO': 'zap',
    
    // Subsecciones del backend - UIKIT
    'TOURS': 'route',
    'FORM_LAYOUT': 'layout',
    'INPUT': 'text-cursor',
    'BUTTON': 'square',
    'TABLE': 'table',
    'LIST': 'list',
    'TREE': 'git-branch',
    'PANEL': 'layout-panel-left',
    'OVERLAY': 'layers',
    'MEDIA': 'image',
    'MENU': 'menu',
    
    // Subsecciones del backend - PAGES
    'CRUD': 'database',
    'HELP': 'help-circle',
    'OOPS': 'alert-triangle',
    'NOT_FOUND': 'search-x',
    'EMPTY': 'inbox',
    'FAQ': 'message-circle-question',
    'CONTACT_US': 'mail',
    
    // Subsecciones del backend - REPORTES
    'REPORTES_LIST': 'list',
    'REPORTES_TABLE': 'table-2',
    'REPORTES_DETAIL': 'file-search',
    
    // Subsecciones comunes (lowercase para compatibilidad)
    'perfil': 'user',
    'notificaciones': 'bell',
    'ayuda': 'help-circle',
    'lista': 'list',
    'formulario': 'file-text',
    'tabla': 'table',
    'crud': 'database',
  } as Record<string, string>,

  default: 'circle',
} as const;

/**
 * Obtiene el ícono correspondiente a un código de sección/subsección
 */
export function getIconByCodigo(codigo: string): string {
  // Intentar primero con el código exacto (mayúsculas del backend)
  const exactMatch = 
    MENU_ICON_CONFIG.secciones[codigo] ??
    MENU_ICON_CONFIG.subsecciones[codigo];
  
  if (exactMatch) return exactMatch;
  
  // Intentar con lowercase como fallback
  const lowerCode = codigo.toLowerCase();
  return (
    MENU_ICON_CONFIG.secciones[lowerCode] ??
    MENU_ICON_CONFIG.subsecciones[lowerCode] ??
    MENU_ICON_CONFIG.default
  );
}
