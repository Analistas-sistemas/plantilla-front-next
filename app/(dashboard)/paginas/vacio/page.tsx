import { PageWithPermissions, PageTemplate } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Inbox, Plus } from 'lucide-react';

export default async function VacioPage() {
  return (
    <PageWithPermissions sectionCode="PAGES" subsectionCode="EMPTY">
      <PageTemplate title="Estado Vacío" description="Ejemplo de página sin datos">
      <Card className="max-w-2xl mx-auto text-center">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-muted">
              <Inbox className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">No hay datos para mostrar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Aún no tienes ningún registro. Comienza agregando tu primer elemento.
          </p>
          
          <Button className="bg-brand-primary hover:bg-brand-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            Agregar primer elemento
          </Button>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg text-left">
            <p className="text-sm font-medium mb-2">💡 Consejo:</p>
            <p className="text-sm text-muted-foreground">
              Este es un ejemplo de página de estado vacío. Se muestra cuando no hay datos disponibles en una sección o listado.
            </p>
          </div>
        </CardContent>
      </Card>
      </PageTemplate>
    </PageWithPermissions>
  );
}
