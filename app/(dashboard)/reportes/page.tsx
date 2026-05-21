import { PageWithPermissions } from '@/components/guards';
import { PageTemplate } from '@/components/common';
import ReporteCard from './_components/reporte-card';

export default async function ReportesPage() {
  // TODO: Obtener reportes desde el servicio
  const reportes = [
    {
      id: 1,
      nombre: 'Reporte de Ventas Mensual',
      descripcion: 'Resumen de ventas del último mes',
      fecha: '2026-05-15',
      estado: 'Completado' as const,
      tipo: 'Excel' as const,
    },
    {
      id: 2,
      nombre: 'Inventario Actualizado',
      descripcion: 'Estado actual del inventario',
      fecha: '2026-05-20',
      estado: 'Procesando' as const,
      tipo: 'PDF' as const,
    },
    {
      id: 3,
      nombre: 'Análisis de Clientes',
      descripcion: 'Segmentación y comportamiento de clientes',
      fecha: '2026-05-18',
      estado: 'Completado' as const,
      tipo: 'Excel' as const,
    },
    {
      id: 4,
      nombre: 'Reporte Financiero Trimestral',
      descripcion: 'Balance financiero Q1 2026',
      fecha: '2026-05-10',
      estado: 'Completado' as const,
      tipo: 'PDF' as const,
    },
  ];

  return (
    <PageWithPermissions sectionCode="REPORTES" subsectionCode="REPORTES_LIST">
      <PageTemplate
        title="Lista de Reportes"
        description="Visualiza y descarga tus reportes generados"
      >
        <div className="grid gap-4">
          {reportes.map((reporte) => (
            <ReporteCard key={reporte.id} reporte={reporte} />
          ))}
        </div>
      </PageTemplate>
    </PageWithPermissions>
  );
}
