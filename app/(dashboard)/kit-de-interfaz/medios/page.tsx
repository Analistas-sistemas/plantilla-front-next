import { PageWithPermissions, PageContainer, ContentCard } from '@/components/shared';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default async function MediosPage() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="MEDIA">
      <PageContainer
        title="Medios"
        description="Componentes para manejo de imágenes, avatares y contenido multimedia"
      >
      {/* Avatares */}
      <ContentCard
        title="Avatares"
        description="Componentes para mostrar fotos de perfil de usuario"
      >
        <div className="flex flex-wrap gap-4 items-center">
          <Avatar className="h-16 w-16">
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback>MG</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10">
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">AM</AvatarFallback>
          </Avatar>
        </div>
      </ContentCard>

      {/* Badges */}
      <ContentCard
        title="Badges (Insignias)"
        description="Etiquetas para mostrar estados, categorías o contadores"
      >
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ContentCard>

      {/* Imágenes */}
      <ContentCard
        title="Imágenes"
        description="Manejo de imágenes con Next.js Image"
      >
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Placeholder de imagen (16:9)
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Usa <code className="px-1 py-0.5 bg-muted rounded">next/image</code> para
            optimización automática de imágenes.
          </p>
        </div>
      </ContentCard>
      </PageContainer>
    </PageWithPermissions>
  );
}
