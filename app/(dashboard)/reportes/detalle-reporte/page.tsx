import { PageWithPermissions, PageTemplate } from '@/components/shared';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Calendar, User, Clock, CheckCircle2 } from 'lucide-react';

export default async function DetalleReportePage() {
  const reporte = {
    id: 1,
    nombre: 'Reporte de Ventas Mensual - Mayo 2026',
    descripcion: 'Análisis detallado de las ventas realizadas durante el mes de mayo 2026, incluyendo métricas de rendimiento y comparativas con meses anteriores.',
    tipo: 'Excel',
    estado: 'Completado',
    fechaCreacion: '2026-05-15T10:30:00',
    fechaCompletado: '2026-05-15T10:35:00',
    creadoPor: 'Juan Pérez',
    tamaño: '2.4 MB',
    descargas: 12,
  };

  const metricas = [
    { label: 'Total Ventas', value: 'S/ 125,450.00', change: '+15.3%' },
    { label: 'Número de Transacciones', value: '1,234', change: '+8.2%' },
    { label: 'Ticket Promedio', value: 'S/ 101.66', change: '+6.5%' },
    { label: 'Clientes Únicos', value: '856', change: '+12.1%' },
  ];

  return (
    <PageWithPermissions sectionCode="REPORTES" subsectionCode="REPORTES_DETAIL">
      <PageTemplate
        title="Detalle del Reporte"
        description="Información completa sobre el reporte seleccionado"
      >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-2xl">{reporte.nombre}</CardTitle>
                    <Badge className="bg-success text-white">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {reporte.estado}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {reporte.descripcion}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Creación</p>
                    <p className="font-medium">
                      {new Date(reporte.fechaCreacion).toLocaleString('es-PE')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completado en</p>
                    <p className="font-medium">5 minutos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Creado por</p>
                    <p className="font-medium">{reporte.creadoPor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Formato / Tamaño</p>
                    <p className="font-medium">{reporte.tipo} - {reporte.tamaño}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métricas Principales</CardTitle>
              <CardDescription>Resumen de los indicadores clave del reporte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {metricas.map((metrica, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">{metrica.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold">{metrica.value}</p>
                      <Badge className="bg-success text-white">
                        {metrica.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-brand-primary hover:bg-brand-primary-hover">
                <Download className="h-4 w-4 mr-2" />
                Descargar Reporte
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              <Separator />
              <Button variant="outline" className="w-full">
                Compartir
              </Button>
              <Button variant="outline" className="w-full text-danger hover:text-danger">
                Eliminar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Descargas</span>
                <span className="font-semibold">{reporte.descargas}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Última descarga</span>
                <span className="font-semibold">Hace 2 horas</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Veces compartido</span>
                <span className="font-semibold">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </PageTemplate>
    </PageWithPermissions>
  );
}
