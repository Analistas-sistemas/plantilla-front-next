import { PageWithPermissions } from '@/components/shared';
import { PageContainer } from '@/components/shared/page-container';
import { ContentCard } from '@/components/shared/content-card';

export default async function ToursPage() {
  return (
    <PageWithPermissions
      sectionCode="UIKIT"
      subsectionCode="TOURS"
      requireRead={true}
    >
      <PageContainer
        title="Tours"
        description="Guías interactivas paso a paso para presentar funcionalidades"
      >
        <ContentCard
          title="Guías Interactivas"
          description="Implementación de tours guiados para ayudar a los usuarios a navegar por el sistema"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Los tours interactivos son útiles para introducir nuevas funcionalidades
              o guiar a nuevos usuarios a través de la interfaz.
            </p>
            <div className="p-4 bg-muted/50 rounded-md">
              <p className="text-sm">
                📌 Próximamente: Implementación de componente de tour con
                react-joyride o similar
              </p>
            </div>
            <div className="p-4 bg-success/10 border border-success rounded-md">
              <p className="text-sm text-success-active">
                ✅ Esta página está protegida con verificación de permisos.
                Solo usuarios con permisos de lectura pueden acceder.
              </p>
            </div>
          </div>
        </ContentCard>
      </PageContainer>
    </PageWithPermissions>
  );
}
