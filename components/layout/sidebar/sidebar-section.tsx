import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {title && (
        <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}
