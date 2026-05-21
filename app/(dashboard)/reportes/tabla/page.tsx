import { PageWithPermissions, PageTemplate } from '@/components/shared';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { ColumnType } from '@/types/data-table';

export default async function ReportesTablaPage() {
  const data = [
    {
      id: 1,
      nombre: 'Reporte de Ventas Mensual',
      tipo: 'Excel',
      fecha: '2026-05-15',
      estado: 'Completado',
    },
    {
      id: 2,
      nombre: 'Inventario Actualizado',
      tipo: 'PDF',
      fecha: '2026-05-20',
      estado: 'Procesando',
    },
    {
      id: 3,
      nombre: 'Análisis de Clientes',
      tipo: 'Excel',
      fecha: '2026-05-18',
      estado: 'Completado',
    },
    {
      id: 4,
      nombre: 'Reporte Financiero Trimestral',
      tipo: 'PDF',
      fecha: '2026-05-10',
      estado: 'Completado',
    },
    {
      id: 5,
      nombre: 'Reporte de Producción',
      tipo: 'Excel',
      fecha: '2026-05-12',
      estado: 'Error',
    },
  ];

  const config = {
    data,
    columns: [
      { field: 'id', header: 'ID', type: ColumnType.NUMBER },
      { field: 'nombre', header: 'Nombre del Reporte', type: ColumnType.TEXT },
      { field: 'tipo', header: 'Tipo', type: ColumnType.TEXT },
      { field: 'fecha', header: 'Fecha', type: ColumnType.DATE },
      { field: 'estado', header: 'Estado', type: ColumnType.TEXT },
    ],
    searchable: true,
    exportable: true,
  };

  return (
    <PageWithPermissions sectionCode="REPORTES" subsectionCode="REPORTES_TABLE">
      <PageTemplate
        title="Reportes - Vista de Tabla"
        description="Gestiona y descarga reportes en formato de tabla"
      >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todos los Reportes</CardTitle>
              <CardDescription>
                {data.length} reportes disponibles
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-export hover:bg-export-hover text-white">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Exportar Excel
              </Button>
              <Button variant="outline" className="bg-danger hover:bg-danger-hover text-white">
                <FileText className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable config={config} />
        </CardContent>
      </Card>
      </PageTemplate>
    </PageWithPermissions>
  );
}
