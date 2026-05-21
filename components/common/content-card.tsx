import { cn } from '@/lib/utils';

interface ContentCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

/**
 * Card reutilizable para secciones de contenido
 */
export function ContentCard({
  title,
  description,
  children,
  className,
  headerAction,
}: ContentCardProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-6 shadow-sm', className)}>
      {(title || headerAction) && (
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            {title && (
              <h2 className="text-lg font-semibold text-brand-primary">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          {headerAction && <div className="ml-4">{headerAction}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
