/**
 * Hook para gestión de breadcrumbs
 * Nota: El breadcrumb se genera automáticamente en el layout
 * Este hook es un placeholder para compatibilidad futura
 */

import { usePathname } from 'next/navigation';

export function useBreadcrumb() {
  const pathname = usePathname();
  
  // Por ahora solo retorna el pathname actual
  // En el futuro se puede extender para manipular breadcrumbs dinámicamente
  return {
    pathname,
  };
}

