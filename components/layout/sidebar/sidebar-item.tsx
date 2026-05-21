'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { MenuItem } from '@/lib/menu/types';

interface SidebarItemProps {
  item: MenuItem;
  depth: number;
  index: number;
  expanded: boolean;
  currentExpandedItemIndex: number[];
  sidebarCollapsed: boolean;
  onExpandChange: (event: { depth: number; index: number; expanded: boolean }) => void;
}

/**
 * Obtiene el componente de icono de lucide-react por nombre
 */
function getIconComponent(iconName?: string) {
  if (!iconName) return LucideIcons.Circle;
  
  // Convertir nombre de icono a PascalCase (ej: "home" -> "Home", "layout-dashboard" -> "LayoutDashboard")
  const pascalCase = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const IconComponent = (LucideIcons as any)[pascalCase];
  return IconComponent || LucideIcons.Circle;
}

export function SidebarItem({
  item,
  depth,
  index,
  expanded,
  currentExpandedItemIndex,
  sidebarCollapsed,
  onExpandChange,
}: SidebarItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(expanded);
  const Icon = getIconComponent(item.icon);

  useEffect(() => {
    setIsOpen(expanded);
  }, [expanded]);

  const isActive = () => {
    if (!item.href) return false;
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  const hasActiveChild = (): boolean => {
    if (!item.items) return false;
    
    return item.items.some(subItem => {
      if (subItem.href && (pathname === subItem.href || pathname.startsWith(subItem.href + '/'))) {
        return true;
      }
      if (subItem.items) {
        return hasActiveChildRecursive(subItem.items);
      }
      return false;
    });
  };

  const hasActiveChildRecursive = (items: MenuItem[]): boolean => {
    return items.some(subItem => {
      if (subItem.href && (pathname === subItem.href || pathname.startsWith(subItem.href + '/'))) {
        return true;
      }
      if (subItem.items) {
        return hasActiveChildRecursive(subItem.items);
      }
      return false;
    });
  };

  const toggleExpansion = (idx: number, e: React.MouseEvent) => {
    if (!item.items) return;
    
    e.preventDefault();
    const newExpanded = !isOpen;
    setIsOpen(newExpanded);
    onExpandChange({ depth, index: idx, expanded: newExpanded });
  };

  const getTooltipText = () => {
    if (sidebarCollapsed) {
      return item.label;
    }
    return undefined;
  };

  const content = (
    <>
      {/* Indicador de hijo activo */}
      {!expanded && hasActiveChild() && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-secondary rounded-r-full" />
      )}
      
      <Icon className="h-5 w-5 flex-shrink-0" />
      
      <span className={cn(
        "text-sm font-medium transition-opacity text-left",
        sidebarCollapsed && "opacity-0 w-0"
      )}>
        {item.label}
      </span>
      
      {item.items && !sidebarCollapsed && (
        <ChevronDown
          className={cn(
            "h-4 w-4 ml-auto transition-transform",
            isOpen && "rotate-180"
          )}
        />
      )}
    </>
  );

  // Si no tiene items, es un link directo
  if (!item.items) {
    return (
      <Link
        href={item.href || '#'}
        className={cn(
          "relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-white/90 transition-colors hover:bg-brand-primary-hover hover:text-white",
          isActive() && "bg-brand-secondary text-white font-semibold",
          depth > 0 && "ml-6"
        )}
        title={getTooltipText()}
        aria-label={item.label}
      >
        {content}
      </Link>
    );
  }

  // Si tiene items, usar Collapsible
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        onClick={(e) => toggleExpansion(index, e)}
        className={cn(
          "relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-white/90 transition-colors hover:bg-brand-primary-hover hover:text-white",
          isActive() && "bg-brand-secondary text-white font-semibold",
          !expanded && hasActiveChild() && "bg-brand-primary-hover/50 text-white",
          depth > 0 && "ml-6"
        )}
        title={getTooltipText()}
        aria-label={item.label}
      >
        {content}
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-1 space-y-1">
        {item.items?.map((subItem, i) => (
          <SidebarItem
            key={subItem.id || i}
            item={subItem}
            depth={depth + 1}
            index={i}
            expanded={currentExpandedItemIndex[depth + 1] === i}
            currentExpandedItemIndex={currentExpandedItemIndex}
            sidebarCollapsed={sidebarCollapsed}
            onExpandChange={onExpandChange}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
