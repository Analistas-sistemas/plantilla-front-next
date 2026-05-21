import { PageContainer } from '@/components/common/page-container';
import { ContentCard } from '@/components/common/content-card';

export default function InicioPage() {
  return (
    <PageContainer
      title="Inicio"
      description="Bienvenido al sistema de plantilla Next.js"
    >
      {/* Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <ContentCard key={i}>
            <h3 className="text-sm font-medium text-muted-foreground">
              Métrica {i}
            </h3>
            <p className="mt-2 text-2xl font-bold">0</p>
          </ContentCard>
        ))}
      </div>

      {/* Contenido Principal */}
      <ContentCard
        title="Contenido Principal"
        description="Este es el contenido del dashboard. Aquí se mostrarán los datos y funcionalidades principales del sistema."
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Este es un sistema modular construido con Next.js 15, TypeScript y
            shadcn/ui. Puedes explorar los diferentes componentes en la sección
            &quot;Kit de Interfaz&quot; del menú lateral.
          </p>
        </div>
      </ContentCard>
    </PageContainer>
  );
}
