'use client';

import { ContentCard } from '@/components/shared/content-card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AccesoDenegadoPageProps {
  searchParams: {
    reason?: string;
  };
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
  'default': {
    title: 'Acceso Denegado',
    description: 'No tiene los permisos necesarios para acceder a esta página.',
  },
};

export default function AccesoDenegadoPage({ searchParams }: AccesoDenegadoPageProps) {
  const reason = searchParams.reason || 'default';
  const message = REASON_MESSAGES[reason] || REASON_MESSAGES.default;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center min-h-[60vh]">
        <ContentCard className="max-w-md w-full text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Icono */}
            <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center">
              <ShieldAlert className="w-10 h-10 text-danger" />
            </div>

            {/* Título y descripción */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-brand-primary">
                {message.title}
              </h1>
              <p className="text-muted-foreground">
                {message.description}
              </p>
            </div>

            {/* Código de error */}
            <div className="text-sm text-muted-foreground">
              <span className="font-mono bg-muted px-2 py-1 rounded">
                403 - Forbidden
              </span>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>
              <Link href="/">
                <Button className="gap-2">
                  <Home className="w-4 h-4" />
                  Ir al Inicio
                </Button>
              </Link>
            </div>

            {/* Información adicional */}
            <div className="pt-4 border-t w-full">
              <p className="text-xs text-muted-foreground">
                Si cree que esto es un error, por favor contacte al administrador del sistema.
              </p>
            </div>
          </div>
        </ContentCard>
      </div>
    </div>
  );
}
