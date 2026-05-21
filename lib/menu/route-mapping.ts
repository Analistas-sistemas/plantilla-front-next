/**
 * Sistema dinámico de mapeo de rutas del backend a rutas de Next.js
 * Convierte automáticamente rutas sin necesidad de mapeo manual
 */

/**
 * Reglas de transformación para prefijos de secciones
 */
const SECTION_PREFIX_RULES: Record<string, string> = {
  'uikit': 'kit-de-interfaz',
  'pages': 'paginas',
  'reportes': 'reportes',
  'inicio': 'inicio',
};

/**
 * Reglas de transformación para nombres de rutas (slugs)
 */
const SLUG_TRANSFORM_RULES: Record<string, string> = {
  // UI Kit
  'formlayout': 'diseno-formulario',
  'input': 'entrada',
  'button': 'boton',
  'table': 'tabla',
  'list': 'lista',
  'tree': 'arbol',
  'panel': 'panel',
  'overlay': 'superposicion',
  'media': 'medios',
  'menu': 'menu',
  'tours': 'tours',
  
  // Páginas
  'crud': 'crud',
  'help': 'ayuda',
  'oops': 'ups',
  'notfound': 'no-encontrado',
  'empty': 'vacio',
  'faq': 'preguntas-frecuentes',
  'contact': 'contactanos',
  
  // Reportes
  'lista': 'lista',
  'tabla': 'tabla',
  'detalle-reporte': 'detalle-reporte',
  
  // Inicio
  'inicio': 'acceso-rapido',
};

/**
 * Convierte una ruta del backend a ruta de Next.js de forma dinámica
 * 
 * @param backendRoute - Ruta desde el backend (ej: '/uikit/formlayout')
 * @returns Ruta transformada para Next.js (ej: '/kit-de-interfaz/diseno-formulario')
 * 
 * @example
 * mapBackendRoute('/uikit/formlayout') // → '/kit-de-interfaz/diseno-formulario'
 * mapBackendRoute('/pages/help') // → '/paginas/ayuda'
 * mapBackendRoute('/reportes/lista') // → '/reportes/lista'
 */
export function mapBackendRoute(backendRoute: string): string {
  // Normalizar la ruta (asegurar que empiece con /)
  const normalizedRoute = backendRoute.startsWith('/') 
    ? backendRoute 
    : `/${backendRoute}`;
  
  // Dividir la ruta en partes
  const parts = normalizedRoute.split('/').filter(Boolean);
  
  if (parts.length === 0) {
    return '/';
  }
  
  // Transformar cada parte de la ruta
  const transformedParts = parts.map((part, index) => {
    // Primera parte: aplicar regla de sección
    if (index === 0 && part in SECTION_PREFIX_RULES) {
      return SECTION_PREFIX_RULES[part];
    }
    
    // Partes subsiguientes: aplicar regla de slug
    if (part in SLUG_TRANSFORM_RULES) {
      return SLUG_TRANSFORM_RULES[part];
    }
    
    // Si no hay regla, devolver la parte original
    return part;
  });
  
  return '/' + transformedParts.join('/');
}

/**
 * Agrega una nueva regla de transformación de sección dinámicamente
 * Útil para extensibilidad sin modificar el código
 */
export function addSectionRule(backendPrefix: string, nextjsPrefix: string): void {
  SECTION_PREFIX_RULES[backendPrefix] = nextjsPrefix;
}

/**
 * Agrega una nueva regla de transformación de slug dinámicamente
 */
export function addSlugRule(backendSlug: string, nextjsSlug: string): void {
  SLUG_TRANSFORM_RULES[backendSlug] = nextjsSlug;
}
