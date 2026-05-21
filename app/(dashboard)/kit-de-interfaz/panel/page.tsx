import { PageWithPermissions, PageContainer, ContentCard } from '@/components/shared';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export default async function PanelPage() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="PANEL">
      <PageContainer
        title="Panel"
        description="Componentes de panel y alertas para mostrar información destacada"
      >
      {/* Alerts */}
      <ContentCard
        title="Alertas"
        description="Mensajes de alerta con diferentes niveles de importancia"
      >
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Información</AlertTitle>
            <AlertDescription>
              Este es un mensaje informativo para el usuario.
            </AlertDescription>
          </Alert>

          <Alert variant="danger">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Ha ocurrido un error en la operación.
            </AlertDescription>
          </Alert>

          <Alert className="border-warning bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertTitle className="text-warning-active">Advertencia</AlertTitle>
            <AlertDescription className="text-warning-active/80">
              Ten precaución con esta acción.
            </AlertDescription>
          </Alert>

          <Alert className="border-success bg-success/10">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertTitle className="text-success-active">Éxito</AlertTitle>
            <AlertDescription className="text-success-active/80">
              La operación se completó correctamente.
            </AlertDescription>
          </Alert>
        </div>
      </ContentCard>

      {/* Paneles de Contenido */}
      <ContentCard
        title="Paneles de Contenido"
        description="Cards y contenedores para organizar información"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg bg-card">
            <h4 className="font-semibold mb-2">Panel 1</h4>
            <p className="text-sm text-muted-foreground">
              Contenido del primer panel
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <h4 className="font-semibold mb-2">Panel 2</h4>
            <p className="text-sm text-muted-foreground">
              Contenido del segundo panel
            </p>
          </div>
        </div>
      </ContentCard>
      </PageContainer>
    </PageWithPermissions>
  );
}
