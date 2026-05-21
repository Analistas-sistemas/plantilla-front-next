'use client';

import { ContentCard } from '@/components/common/content-card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AccessDeniedProps {
  reason?: 'error' | 'no-module' | 'insufficient' | 'no-access';
  title?: string;
  description?: string;
  showActions?: boolean;
}

const REASON_MESSAGES: Record<string, { title: string; description: string }> = {
  'error': {
    title: 'Error al verificar permisos',
    description: 'No se pudieron cargar los permisos de acceso. Por favor, intente nuevamente.',
  },
  'no-module': {
    title: 'Módulo no encontrado',
    description: 'El módulo solicitado no existe o no tiene permisos asignados.',
  },
  'insufficient': {
    title: 'Permisos insuficientes',
    description: 'No tiene los permisos necesarios para acceder a esta funcionalidad.',
  },
  'no-access': {
    title: 'Sin acceso',
    description: 'No tiene acceso a esta sección del sistema.',
  },
};

export function AccessDenied({
  reason,
  title,
  description,
  showActions = true,
}: AccessDeniedProps) {
  const message = reason ? REASON_MESSAGES[reason] : null;
  const displayTitle = title || message?.title || 'Acceso Denegado';
  const displayDescription =
    description || message?.description || 'No tiene los permisos necesarios para acceder a esta página.';

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <ContentCard className="max-w-md w-full text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Icono */}
          <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-danger" />
          </div>

          {/* Título y descripción */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{displayTitle}</h1>
            <p className="text-sm text-muted-foreground">{displayDescription}</p>
          </div>

          {/* Acciones */}
          {showActions && (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="outline" asChild>
                <Link href="javascript:history.back()">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Link>
              </Button>
              <Button asChild>
                <Link href="/inicio">
                  <Home className="mr-2 h-4 w-4" />
                  Ir al Inicio
                </Link>
              </Button>
            </div>
          )}
        </div>
      </ContentCard>
    </div>
  );
}
