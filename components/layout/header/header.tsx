'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ProfileMenu } from './profile-menu';
import type { Usuario, ContextoCompleto, BreadcrumbItem as BreadcrumbItemType } from '@/types/user';

interface HeaderProps {
  breadcrumbItems?: BreadcrumbItemType[];
  usuario: Usuario | null;
  contextoCompleto?: ContextoCompleto | null;
  onLogout?: () => void;
}

export function Header({ breadcrumbItems = [], usuario, contextoCompleto, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-brand-primary-hover/20 bg-white px-6 shadow-sm">
      {/* Breadcrumb */}
      <div className="flex-1">
        {breadcrumbItems.length > 0 ? (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                return (
                  <BreadcrumbItem key={index}>
                    {!isLast ? (
                      <>
                        <BreadcrumbLink href={item.href || '#'}>
                          {item.label}
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <div className="h-6"></div>
        )}
      </div>

      {/* Profile Menu */}
      <div className="flex items-center gap-3">
        <ProfileMenu 
          usuario={usuario}
          contextoCompleto={contextoCompleto}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}
