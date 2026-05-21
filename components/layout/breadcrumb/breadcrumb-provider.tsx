'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Header } from '../header/header';
import type { Usuario, ContextoCompleto, BreadcrumbItem } from '@/types/user';
import type { MenuItem } from '@/lib/menu/types';

interface BreadcrumbProviderProps {
  usuario: Usuario | null;
  contextoCompleto?: ContextoCompleto | null;
  menuItems: MenuItem[];
  onLogout?: () => void;
}

/**
 * Busca un item del menú por su ruta
 */
function findMenuItemByPath(items: MenuItem[], path: string): MenuItem | null {
  for (const item of items) {
    if (item.href === path) {
      return item;
    }
    if (item.items) {
      const found = findMenuItemByPath(item.items, path);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Genera el breadcrumb basado en la ruta actual y el menú
 */
function generateBreadcrumb(pathname: string, menuItems: MenuItem[]): BreadcrumbItem[] {
  const breadcrumb: BreadcrumbItem[] = [
    { label: 'Inicio', href: '/' }
  ];

  // Si estamos en la raíz, solo mostrar Inicio
  if (pathname === '/') {
    return breadcrumb;
  }

  // Buscar el item del menú que coincida con la ruta
  const menuItem = findMenuItemByPath(menuItems, pathname);
  
  if (menuItem) {
    // Si encontramos el item, agregarlo al breadcrumb
    // Podríamos buscar también su padre, pero por ahora solo mostramos el item actual
    breadcrumb.push({
      label: menuItem.label,
      href: menuItem.href
    });
  } else {
    // Si no lo encontramos en el menú, generar desde el path
    const segments = pathname.split('/').filter(Boolean);
    segments.forEach((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumb.push({ label, href: path });
    });
  }

  return breadcrumb;
}

export function BreadcrumbProvider({ 
  usuario, 
  contextoCompleto, 
  menuItems,
  onLogout 
}: BreadcrumbProviderProps) {
  const pathname = usePathname();
  
  const breadcrumbItems = useMemo(() => {
    return generateBreadcrumb(pathname, menuItems);
  }, [pathname, menuItems]);

  return (
    <Header
      breadcrumbItems={breadcrumbItems}
      usuario={usuario}
      contextoCompleto={contextoCompleto}
      onLogout={onLogout}
    />
  );
}
