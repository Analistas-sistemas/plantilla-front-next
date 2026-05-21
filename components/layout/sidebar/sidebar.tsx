'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { SidebarItem } from './sidebar-item';
import type { MenuItem } from '@/lib/menu/types';

interface SidebarProps {
  menuItems: MenuItem[];
  title?: string;
  version?: string;
  defaultOpen?: boolean;
}

export function Sidebar({ menuItems, title = 'Sistema', version = 'v1.0.0', defaultOpen = true }: SidebarProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [currentExpandedItemIndex, setCurrentExpandedItemIndex] = useState<number[]>([]);

  const handleExpandChange = (event: { depth: number; index: number; expanded: boolean }) => {
    setCurrentExpandedItemIndex(prev => {
      const newState = [...prev];
      
      if (event.expanded) {
        // Expandir: establecer el índice en la profundidad correspondiente
        newState[event.depth] = event.index;
        // Limpiar profundidades mayores
        return newState.slice(0, event.depth + 1);
      } else {
        // Colapsar: limpiar desde esta profundidad
        return newState.slice(0, event.depth);
      }
    });
  };

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen border-r border-brand-primary-hover bg-brand-primary transition-all duration-300",
        open ? "w-64" : "w-16"
      )}
    >
      {/* Header con título */}
      <div
        className={cn(
          "flex items-center justify-between border-b border-brand-primary-hover px-4 py-3 transition-all",
          !open && "justify-center px-2"
        )}
      >
        {open && (
          <h2 className="text-lg font-semibold truncate text-white">{title}</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className={cn(
            "h-8 w-8 flex-shrink-0 transition-transform text-white hover:text-white hover:bg-white/10",
            !open && "rotate-180"
          )}
          aria-label={open ? 'Colapsar menú' : 'Expandir menú'}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Menú principal */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item, i) => (
            <SidebarItem
              key={item.id || i}
              item={item}
              depth={0}
              index={i}
              expanded={currentExpandedItemIndex[0] === i}
              currentExpandedItemIndex={currentExpandedItemIndex}
              sidebarCollapsed={!open}
              onExpandChange={handleExpandChange}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* Versión del sistema */}
      {open && (
        <div className="border-t border-brand-primary-hover p-3">
          <p className="text-xs text-center text-white/70">
            {version}
          </p>
        </div>
      )}
    </aside>
  );
}
