import { ContentCard } from '@/components/common/content-card';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ContentCard className="max-w-md w-full text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Icono */}
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <FileQuestion className="w-10 h-10 text-muted-foreground" />
          </div>

          {/* Título y descripción */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Página no encontrada</h2>
            <p className="text-sm text-muted-foreground">
              La página que estás buscando no existe o ha sido movida.
            </p>
          </div>

          {/* Acciones */}
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
        </div>
      </ContentCard>
    </div>
  );
}
