import { PageWithPermissions, PageContainer, ContentCard } from '@/components/shared';
import { Badge } from '@/components/ui/badge';

export default async function ListaPage() {
  const items = [
    { id: 1, titulo: 'Elemento 1', descripcion: 'Primera descripción', prioridad: 'Alta' },
    { id: 2, titulo: 'Elemento 2', descripcion: 'Segunda descripción', prioridad: 'Media' },
    { id: 3, titulo: 'Elemento 3', descripcion: 'Tercera descripción', prioridad: 'Baja' },
    { id: 4, titulo: 'Elemento 4', descripcion: 'Cuarta descripción', prioridad: 'Alta' },
  ];

  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="LIST">
      <PageContainer
        title="Lista"
        description="Componentes de lista para mostrar elementos de forma ordenada"
      >
      <ContentCard
        title="Lista Simple"
        description="Lista básica de elementos"
      >
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1">
                <h4 className="font-medium">{item.titulo}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.descripcion}
                </p>
              </div>
              <Badge
                variant={
                  item.prioridad === 'Alta'
                    ? 'destructive'
                    : item.prioridad === 'Media'
                    ? 'default'
                    : 'secondary'
                }
              >
                {item.prioridad}
              </Badge>
            </li>
          ))}
        </ul>
      </ContentCard>

      <ContentCard
        title="Lista Compacta"
        description="Lista más densa para mayor cantidad de información"
      >
        <div className="divide-y">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-3 flex items-center justify-between hover:bg-muted/50 px-2 rounded transition-colors"
            >
              <span className="text-sm font-medium">{item.titulo}</span>
              <span className="text-sm text-muted-foreground">{item.descripcion}</span>
            </div>
          ))}
        </div>
      </ContentCard>
      </PageContainer>
    </PageWithPermissions>
  );
}
