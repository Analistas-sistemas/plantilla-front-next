import { PageWithPermissions, PageContainer, ContentCard } from '@/components/shared';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function EntradaPage() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="INPUT">
      <PageContainer
        title="Entrada"
        description="Componentes de entrada de texto y campos de formulario"
      >
      <ContentCard
        title="Inputs Básicos"
        description="Diferentes tipos de campos de entrada"
      >
        <div className="space-y-6">
          {/* Input básico */}
          <div className="space-y-2">
            <Label htmlFor="basic">Input Básico</Label>
            <Input id="basic" placeholder="Escribe algo..." />
          </div>

          {/* Input con tipo */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="correo@ejemplo.com" />
          </div>

          {/* Input deshabilitado */}
          <div className="space-y-2">
            <Label htmlFor="disabled">Deshabilitado</Label>
            <Input id="disabled" placeholder="No editable" disabled />
          </div>

          {/* Input con error */}
          <div className="space-y-2">
            <Label htmlFor="error" className="text-destructive">
              Con Error
            </Label>
            <Input
              id="error"
              placeholder="Campo requerido"
              className="border-destructive"
            />
            <p className="text-sm text-destructive">Este campo es requerido</p>
          </div>
        </div>
      </ContentCard>

      <ContentCard
        title="Inputs Corporativos"
        description="Inputs con el branding de Nettalco (haz clic en cualquier campo)"
      >
        <div className="space-y-6">
          {/* Input con branding - focus */}
          <div className="space-y-2">
            <Label htmlFor="branded">
              Input Estándar
            </Label>
            <Input 
              id="branded" 
              placeholder="Escribe algo..." 
            />
            <p className="text-sm text-muted-foreground">Al hacer clic, el borde se ilumina con el color corporativo</p>
          </div>

          {/* Input con borde primario */}
          <div className="space-y-2">
            <Label htmlFor="branded-border">
              Email Corporativo
            </Label>
            <Input 
              id="branded-border" 
              placeholder="correo@nettalco.com" 
              type="email"
            />
          </div>

          {/* Input con label y descripción branded */}
          <div className="space-y-2">
            <Label htmlFor="branded-full">
              Nombre de Usuario
            </Label>
            <Input 
              id="branded-full" 
              placeholder="usuario123" 
            />
            <p className="text-sm text-muted-foreground">Este será tu identificador único en el sistema</p>
          </div>

          {/* Input de búsqueda */}
          <div className="space-y-2">
            <Label htmlFor="search">
              Búsqueda
            </Label>
            <Input 
              id="search" 
              type="search"
              placeholder="Buscar..." 
            />
          </div>
        </div>
      </ContentCard>
      </PageContainer>
    </PageWithPermissions>
  );
}
