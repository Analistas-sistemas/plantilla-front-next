import { cn } from '@/lib/utils';

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Contenedor estándar para todas las páginas del dashboard
 * Proporciona un layout consistente con título, descripción y contenido
 */
export function PageContainer({
  title,
  description,
  children,
  className,
}: PageContainerProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header de la página */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-primary">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>

      {/* Contenido principal */}
      <div className="space-y-6">{children}</div>
    </div>
  );
}
