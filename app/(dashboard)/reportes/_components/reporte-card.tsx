'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Reporte {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  estado: 'Completado' | 'Procesando' | 'Error';
  tipo: 'Excel' | 'PDF' | 'CSV';
}

interface ReporteCardProps {
  reporte: Reporte;
}

export default function ReporteCard({ reporte }: ReporteCardProps) {
  const getEstadoBadge = (estado: Reporte['estado']) => {
    const variants: Record<Reporte['estado'], string> = {
      'Completado': 'bg-success text-white',
      'Procesando': 'bg-warning text-white',
      'Error': 'bg-danger text-white',
    };
    return variants[estado];
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
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
          <Button variant="outline" size="sm" asChild>
            <Link href={`/reportes/${reporte.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Ver
            </Link>
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
  );
}
