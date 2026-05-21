'use client';

import { PageContainer, ContentCard } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LoadingOverlay } from '@/components/shared/loading-overlay';
import { loadingStore } from '@/lib/loading/loading-store';

export function SuperposicionPageContent() {
  const handleShowLoading = () => {
    loadingStore.show('Cargando datos...');
    setTimeout(() => loadingStore.hide(), 2000);
  };

  return (
    <PageContainer
      title="Superposición"
      description="Componentes de diálogos, modales y overlays"
    >
      <LoadingOverlay />

      {/* Diálogos */}
      <ContentCard
        title="Diálogos (Modales)"
        description="Ventanas modales para confirmaciones e información"
      >
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Abrir Diálogo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Título del Diálogo</DialogTitle>
                <DialogDescription>
                  Este es un ejemplo de diálogo modal. Puedes usarlo para
                  confirmaciones, formularios o mostrar información importante.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ContentCard>

      {/* Sheets */}
      <ContentCard
        title="Sheets (Paneles Laterales)"
        description="Paneles deslizantes desde los bordes de la pantalla"
      >
        <div className="flex flex-wrap gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Abrir Panel Derecho</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Panel Lateral</SheetTitle>
                <SheetDescription>
                  Los panels laterales son útiles para formularios, filtros o
                  información detallada sin abandonar la página actual.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Contenido del panel lateral aquí...
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ContentCard>

      {/* Loading Overlay */}
      <ContentCard
        title="Loading Overlay"
        description="Overlay de carga para operaciones asíncronas"
      >
        <div className="space-y-4">
          <Button onClick={handleShowLoading}>Mostrar Loading (2s)</Button>
          <p className="text-sm text-muted-foreground">
            El loading overlay bloquea la interacción mientras se realiza una
            operación. Usa el hook <code className="px-1 py-0.5 bg-muted rounded">useLoading</code> para
            controlar el estado global.
          </p>
        </div>
      </ContentCard>
    </PageContainer>
  );
}
