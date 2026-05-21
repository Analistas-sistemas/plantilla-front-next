import { PageWithPermissions } from '@/components/guards';
import { PageTemplate } from '@/components/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ArrowLeft, Calendar, User, FileType } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ReporteDetallePageProps {
  params: {
    id: string;
  };
}

export default async function ReporteDetallePage({ params }: ReporteDetallePageProps) {
  const { id } = params;

  // TODO: Obtener reporte desde el servicio
  // const reporte = await ReportesService.getReporteById(id);
  
  // Datos de ejemplo
  const reportes = [
    {
      id: '1',
      nombre: 'Reporte de Ventas Mensual',
      descripcion: 'Resumen de ventas del último mes',
      fecha: '2026-05-15',
      estado: 'Completado' as const,
      tipo: 'Excel' as const,
      autor: 'Juan Pérez',
      tamanio: '2.5 MB',
      registros: 1245,
    },
    {
      id: '2',
      nombre: 'Inventario Actualizado',
      descripcion: 'Estado actual del inventario',
      fecha: '2026-05-20',
      estado: 'Procesando' as const,
      tipo: 'PDF' as const,
      autor: 'María García',
      tamanio: '1.2 MB',
      registros: 856,
    },
  ];

  const reporte = reportes.find((r) => r.id === id);

  if (!reporte) {
    notFound();
  }

  const getEstadoBadge = (estado: typeof reporte.estado) => {
    const variants = {
      'Completado': 'bg-success text-white',
      'Procesando': 'bg-warning text-white',
      'Error': 'bg-danger text-white',
    };
    return variants[estado];
  };

  return (
    <PageWithPermissions sectionCode="REPORTES" subsectionCode="REPORTES_DETAIL">
      <PageTemplate
        title={reporte.nombre}
        description={reporte.descripcion}
      >
        <div className="space-y-6">
          {/* Información general */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-brand-primary/10">
                    <FileText className="h-8 w-8 text-brand-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{reporte.nombre}</CardTitle>
                    <CardDescription className="mt-2">{reporte.descripcion}</CardDescription>
                  </div>
                </div>
                <Badge className={getEstadoBadge(reporte.estado)}>
                  {reporte.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Fecha de generación</span>
                  </div>
                  <p className="font-medium">
                    {new Date(reporte.fecha).toLocaleDateString('es-PE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileType className="h-4 w-4" />
                    <span>Tipo de archivo</span>
                  </div>
                  <p className="font-medium">{reporte.tipo}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Generado por</span>
                  </div>
                  <p className="font-medium">{reporte.autor}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Tamaño</span>
                  </div>
                  <p className="font-medium">{reporte.tamanio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas del Reporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Total de registros</p>
                  <p className="text-2xl font-bold">{reporte.registros.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Tamaño del archivo</p>
                  <p className="text-2xl font-bold">{reporte.tamanio}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Tiempo de generación</p>
                  <p className="text-2xl font-bold">5.2s</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/reportes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a la lista
              </Link>
            </Button>
            <Button
              className="bg-export hover:bg-export-hover"
              disabled={reporte.estado !== 'Completado'}
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar Reporte
            </Button>
          </div>
        </div>
      </PageTemplate>
    </PageWithPermissions>
  );
}
