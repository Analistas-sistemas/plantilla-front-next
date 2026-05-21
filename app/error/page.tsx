import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { AlertTriangle, XCircle, Lock, Ban, Search, Server, Wrench, Clock, Wifi, HourglassIcon, LucideIcon, Home, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { ERROR_MESSAGES } from '@/lib/errors/error-messages';
import { BackButton } from './back-button';

export const metadata: Metadata = {
  title: 'Error - Sistema Plantilla',
  description: 'Ha ocurrido un error en el sistema',
};

const ERROR_ICONS: Record<string, LucideIcon> = {
  '401': Lock,
  '403': Ban,
  '419': AlertTriangle,
  '404': Search,
  '500': XCircle,
  '502': Server,
  '503': Wrench,
  '504': Clock,
  'maintenance': Wrench,
  'network': Wifi,
  '0': Wifi,
  'timeout': HourglassIcon,
};

interface ErrorPageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const errorCode = params.code || '404';
  const errorInfo = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES['500'];
  const IconComponent = ERROR_ICONS[errorCode] || AlertTriangle;

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-br from-brand-primary/5 via-background to-brand-primary/10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header with logo/brand */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-primary">Sistema Plantilla</h1>
              <p className="text-xs text-muted-foreground">Nettalco</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Error card */}
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
            {/* Top accent bar */}
            <div className={`h-2 ${
              errorInfo.severity === 'error' ? 'bg-gradient-to-r from-destructive to-destructive/60' :
              errorInfo.severity === 'warn' ? 'bg-gradient-to-r from-warning to-warning/60' :
              'bg-gradient-to-r from-brand-primary to-brand-primary-hover'
            }`} />
            
            <div className="p-8 md:p-12">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className={`relative p-6 rounded-2xl ${
                  errorInfo.severity === 'error' ? 'bg-destructive/10' :
                  errorInfo.severity === 'warn' ? 'bg-warning/10' :
                  'bg-brand-primary/10'
                }`}>
                  <div className="absolute inset-0 rounded-2xl animate-pulse opacity-20" style={{
                    background: errorInfo.severity === 'error' ? 'radial-gradient(circle, hsl(var(--destructive)) 0%, transparent 70%)' :
                                errorInfo.severity === 'warn' ? 'radial-gradient(circle, hsl(var(--warning)) 0%, transparent 70%)' :
                                'radial-gradient(circle, hsl(var(--brand-primary)) 0%, transparent 70%)'
                  }} />
                  <IconComponent className={`h-20 w-20 relative z-10 ${
                    errorInfo.severity === 'error' ? 'text-destructive' :
                    errorInfo.severity === 'warn' ? 'text-warning' :
                    'text-brand-primary'
                  }`} />
                </div>
              </div>

              {/* Error code badge */}
              <div className="flex justify-center mb-4">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                  errorInfo.severity === 'error' ? 'bg-destructive/10 text-destructive' :
                  errorInfo.severity === 'warn' ? 'bg-warning/10 text-warning' :
                  'bg-brand-primary/10 text-brand-primary'
                }`}>
                  <span className="text-xs">Código</span>
                  <span className="text-lg">{errorInfo.code}</span>
                </div>
              </div>

              {/* Title and description */}
              <div className="text-center mb-8 space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {errorInfo.title}
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  {errorInfo.message}
                </p>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  {errorInfo.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button asChild size="lg" className="flex-1 bg-brand-primary hover:bg-brand-primary-hover text-white shadow-lg shadow-brand-primary/25">
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Ir al inicio
                  </Link>
                </Button>
                <BackButton />
              </div>

              {/* Help section */}
              <div className="pt-6 border-t border-border/50">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <HelpCircle className="h-4 w-4 text-brand-primary" />
                  <p className="text-sm font-medium text-foreground">¿Necesitas ayuda?</p>
                </div>
                <div className="flex gap-4 justify-center text-sm flex-wrap">
                  <Link 
                    href="/paginas/ayuda" 
                    className="text-brand-primary hover:text-brand-primary-hover underline-offset-4 hover:underline font-medium transition-colors"
                  >
                    Centro de ayuda
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link 
                    href="/paginas/contactanos" 
                    className="text-brand-primary hover:text-brand-primary-hover underline-offset-4 hover:underline font-medium transition-colors"
                  >
                    Contáctanos
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Si el problema persiste, por favor contacta al equipo de soporte técnico
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-xs text-muted-foreground">
          <p>© 2026 Nettalco. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
