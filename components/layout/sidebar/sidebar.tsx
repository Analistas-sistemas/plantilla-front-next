'use client';

import { useState } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SidebarItem } from './sidebar-item';
import type { MenuItem } from '@/lib/menu/types';

interface SidebarProps {
  menuItems: MenuItem[];
  title?: string;
  version?: string;
  defaultOpen?: boolean;
}

export function Sidebar({ menuItems, title = 'Sistema', version = 'v1.0.0', defaultOpen = true }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
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
            "h-8 w-8 flex-shrink-0 transition-transform text-white hover:text-white hover:bg-white/10 md:flex hidden",
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
              onNavigate={closeMobileSidebar}
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
    </>
  );

  return (
    <>
      {/* Botón hamburguesa móvil */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 h-10 w-10 bg-brand-primary text-white hover:bg-brand-primary-hover"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar móvil (Sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-brand-primary border-r border-brand-primary-hover md:hidden">
          <div className="flex flex-col h-full">
            {sidebarContent}
          </div>
        </SheetContent>
      </Sheet>

      {/* Sidebar desktop */}
      <aside
        className={cn(
          "relative flex-col h-screen border-r border-brand-primary-hover bg-brand-primary transition-all duration-300 hidden md:flex",
          open ? "w-64" : "w-16"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
