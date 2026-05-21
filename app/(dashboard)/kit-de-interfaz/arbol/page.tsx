import { PageWithPermissions, PageContainer, ContentCard } from '@/components/shared';

export default async function ArbolPage() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="TREE">
      <PageContainer
        title="Árbol"
        description="Componentes de vista de árbol para estructuras jerárquicas"
      >
      <ContentCard
        title="Vista de Árbol"
        description="Representación de datos jerárquicos en estructura de árbol"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Los componentes de árbol son útiles para representar estructuras
            jerárquicas como:
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
            <li>Estructuras de carpetas</li>
            <li>Menús anidados</li>
            <li>Taxonomías y categorías</li>
            <li>Organigramas</li>
          </ul>
          <div className="p-4 bg-muted/50 rounded-md">
            <p className="text-sm">
              📌 Próximamente: Implementación de componente de árbol con
              react-arborist o similar
            </p>
          </div>
        </div>
      </ContentCard>
      </PageContainer>
    </PageWithPermissions>
  );
}
