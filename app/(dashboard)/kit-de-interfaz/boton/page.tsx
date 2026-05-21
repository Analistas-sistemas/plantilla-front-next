import { PageWithPermissions } from '@/components/guards';
import { PageContainer, ContentCard } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Download, Trash2, Save, Plus } from 'lucide-react';

export default async function BotonPage() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="BUTTON">
      <PageContainer
        title="Botón"
        description="Componentes de botones con diferentes variantes y estilos"
      >
      {/* Variantes */}
      <ContentCard
        title="Variantes de Botones"
        description="Diferentes estilos según el contexto de uso"
      >
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </ContentCard>

      {/* Botones con Branding */}
      <ContentCard
        title="Botones Corporativos"
        description="Botones con los colores del branding de Nettalco"
      >
        <div className="flex flex-wrap gap-4">
          <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white">
            Primario
          </Button>
          <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white shadow-lg shadow-brand-primary/25">
            Con Sombra
          </Button>
          <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/10">
            Outline Primario
          </Button>
          <Button variant="ghost" className="text-brand-primary hover:text-brand-primary-hover hover:bg-brand-primary/10">
            Ghost Primario
          </Button>
        </div>
      </ContentCard>

      {/* Tamaños */}
      <ContentCard title="Tamaños" description="Diferentes tamaños disponibles">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm" className="bg-brand-primary hover:bg-brand-primary-hover text-white">Small</Button>
          <Button size="default" className="bg-brand-primary hover:bg-brand-primary-hover text-white">Default</Button>
          <Button size="lg" className="bg-brand-primary hover:bg-brand-primary-hover text-white">Large</Button>
          <Button size="icon" className="bg-brand-primary hover:bg-brand-primary-hover text-white">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </ContentCard>

      {/* Con Iconos */}
      <ContentCard
        title="Botones con Iconos"
        description="Combinación de texto e iconos"
      >
        <div className="flex flex-wrap gap-4">
          <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white">
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
          <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/10">
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Agregar
          </Button>
        </div>
      </ContentCard>

      {/* Estados */}
      <ContentCard title="Estados" description="Diferentes estados de botones">
        <div className="flex flex-wrap gap-4">
          <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white">Normal</Button>
          <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white" disabled>Deshabilitado</Button>
        </div>
      </ContentCard>
      </PageContainer>
    </PageWithPermissions>
  );
}
