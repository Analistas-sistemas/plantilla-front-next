import { PageWithPermissions } from '@/components/guards';
import { PageTemplate } from '@/components/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/common/data-table/data-table';
import { Plus, Search } from 'lucide-react';
import { ColumnType } from '@/types/data-table';

export default async function CrudPage() {
  const data = [
    { id: 1, nombre: 'Item 1', descripcion: 'Descripción del item 1', estado: 'Activo' },
    { id: 2, nombre: 'Item 2', descripcion: 'Descripción del item 2', estado: 'Inactivo' },
    { id: 3, nombre: 'Item 3', descripcion: 'Descripción del item 3', estado: 'Activo' },
  ];

  const config = {
    data,
    columns: [
      { field: 'id', header: 'ID', type: ColumnType.NUMBER },
      { field: 'nombre', header: 'Nombre', type: ColumnType.TEXT },
      { field: 'descripcion', header: 'Descripción', type: ColumnType.TEXT },
      { field: 'estado', header: 'Estado', type: ColumnType.TEXT },
    ],
    searchable: true,
    exportable: true,
  };

  return (
    <PageWithPermissions sectionCode="PAGES" subsectionCode="CRUD">
      <PageTemplate
        title="CRUD - Gestión de Datos"
        description="Crear, leer, actualizar y eliminar registros"
      >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Listado de Registros</CardTitle>
              <CardDescription>Administra tus registros desde aquí</CardDescription>
            </div>
            <Button className="bg-brand-primary hover:bg-brand-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Registro
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <div className="flex-1">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="Buscar registros..." className="pl-9" />
              </div>
            </div>
          </div>

          <DataTable config={config} />
        </CardContent>
      </Card>
      </PageTemplate>
    </PageWithPermissions>
  );
}
