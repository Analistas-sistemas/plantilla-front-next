import { PageWithPermissions, PageTemplate } from '@/components/shared';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Calendar } from 'lucide-react';

export default async function ReportesListaPage() {
  const reportes = [
    {
      id: 1,
      nombre: 'Reporte de Ventas Mensual',
      descripcion: 'Resumen de ventas del último mes',
      fecha: '2026-05-15',
      estado: 'Completado',
      tipo: 'Excel',
    },
    {
      id: 2,
      nombre: 'Inventario Actualizado',
      descripcion: 'Estado actual del inventario',
      fecha: '2026-05-20',
      estado: 'Procesando',
      tipo: 'PDF',
    },
    {
      id: 3,
      nombre: 'Análisis de Clientes',
      descripcion: 'Segmentación y comportamiento de clientes',
      fecha: '2026-05-18',
      estado: 'Completado',
      tipo: 'Excel',
    },
    {
      id: 4,
      nombre: 'Reporte Financiero Trimestral',
      descripcion: 'Balance financiero Q1 2026',
      fecha: '2026-05-10',
      estado: 'Completado',
      tipo: 'PDF',
    },
  ];

  const getEstadoBadge = (estado: string) => {
    const variants: Record<string, string> = {
      'Completado': 'bg-success text-white',
      'Procesando': 'bg-warning text-white',
      'Error': 'bg-danger text-white',
    };
    return variants[estado] || 'bg-gray-500 text-white';
  };

  return (
    <PageWithPermissions sectionCode="REPORTES" subsectionCode="REPORTES_LIST">
      <PageTemplate
        title="Lista de Reportes"
        description="Visualiza y descarga tus reportes generados"
      >
      <div className="grid gap-4">
        {reportes.map((reporte) => (
          <Card key={reporte.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-brand-primary/10">
                    <FileText className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{reporte.nombre}</CardTitle>
                    <CardDescription>{reporte.descripcion}</CardDescription>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(reporte.fecha).toLocaleDateString('es-PE')}
                      </span>
                      <span>•</span>
                      <span>{reporte.tipo}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getEstadoBadge(reporte.estado)}>
                  {reporte.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver
                </Button>
                <Button
                  size="sm"
                  className="bg-export hover:bg-export-hover"
                  disabled={reporte.estado !== 'Completado'}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </PageTemplate>
    </PageWithPermissions>
  );
}
