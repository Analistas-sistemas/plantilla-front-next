/**
 * Hook para gestión de breadcrumbs
 */

import { useContext } from 'react';
import { BreadcrumbContext } from '@/components/layout/breadcrumb-provider';

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  
  if (!context) {
    throw new Error('useBreadcrumb debe ser usado dentro de BreadcrumbProvider');
  }
  
  return context;
}
