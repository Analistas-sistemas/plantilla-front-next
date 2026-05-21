'use client';

import { PageContainer, ContentCard } from '@/components/common';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const sampleData = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@ejemplo.com', estado: 'Activo' },
  { id: 2, nombre: 'María García', email: 'maria@ejemplo.com', estado: 'Activo' },
  { id: 3, nombre: 'Carlos López', email: 'carlos@ejemplo.com', estado: 'Inactivo' },
  { id: 4, nombre: 'Ana Martínez', email: 'ana@ejemplo.com', estado: 'Activo' },
];

export function TablaPageContent() {
  return (
    <PageContainer
      title="Tabla"
      description="Componentes de tabla para visualización de datos"
    >
      {/* Tabla Básica */}
      <ContentCard
        title="Tabla Básica"
        description="Tabla simple con shadcn/ui"
      >
        <Table>
          <TableCaption>Lista de usuarios del sistema</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={row.estado === 'Activo' ? 'default' : 'secondary'}
                  >
                    {row.estado}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContentCard>

      {/* Tabla Avanzada */}
      <ContentCard
        title="Tabla Avanzada"
        description="Para tablas con paginación, filtros y exportación, ver el componente DataTable en components/shared/data-table.tsx"
      >
        <div className="p-4 bg-muted/50 rounded-md">
          <p className="text-sm">
            📌 El componente <code className="px-1 py-0.5 bg-muted rounded">DataTable</code> incluye:
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li>Paginación automática</li>
            <li>Ordenamiento por columnas</li>
            <li>Filtros de búsqueda</li>
            <li>Exportación a Excel</li>
            <li>Personalización de columnas</li>
          </ul>
        </div>
      </ContentCard>
    </PageContainer>
  );
}
