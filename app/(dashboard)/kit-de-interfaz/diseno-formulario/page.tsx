import { PageWithPermissions, PageContainer, ContentCard } from '@/components/shared';

export default async function DisenoFormularioPage() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="FORM_LAYOUT">
      <PageContainer
        title="Diseño de Formulario"
        description="Componentes y patrones para la construcción de formularios"
      >
      <ContentCard
        title="Formularios con React Hook Form"
        description="Formularios validados con Zod y React Hook Form"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Usa React Hook Form para formularios performantes con validación de Zod.
          </p>
          <div className="p-4 bg-muted/50 rounded-md">
            <p className="text-sm">
              📌 Próximamente: Ejemplos de formularios con diferentes layouts
              y validaciones
            </p>
          </div>
        </div>
      </ContentCard>
      </PageContainer>
    </PageWithPermissions>
  );
}
