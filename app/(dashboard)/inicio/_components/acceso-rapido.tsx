import { PageTemplate } from '@/components/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, FileText, Users, BarChart3, Settings, Clock } from 'lucide-react';

export default function AccesoRapido() {
  const shortcuts = [
    { icon: FileText, label: 'Nuevo Documento', description: 'Crear documento', href: '#' },
    { icon: Users, label: 'Gestión Usuarios', description: 'Administrar usuarios', href: '#' },
    { icon: BarChart3, label: 'Reportes', description: 'Ver reportes', href: '#' },
    { icon: Settings, label: 'Configuración', description: 'Ajustes del sistema', href: '#' },
    { icon: Clock, label: 'Historial', description: 'Ver actividad reciente', href: '#' },
  ];

  return (
    <PageTemplate
      title="Acceso Rápido"
      description="Enlaces rápidos a las funcionalidades más utilizadas del sistema"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shortcuts.map((shortcut, index) => {
          const Icon = shortcut.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-primary/10">
                    <Icon className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{shortcut.label}</CardTitle>
                    <CardDescription>{shortcut.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Documento creado</p>
                <p className="text-sm text-muted-foreground">Hace 2 horas</p>
              </div>
              <Button variant="outline" size="sm">Ver</Button>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Usuario actualizado</p>
                <p className="text-sm text-muted-foreground">Hace 5 horas</p>
              </div>
              <Button variant="outline" size="sm">Ver</Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Reporte generado</p>
                <p className="text-sm text-muted-foreground">Hace 1 día</p>
              </div>
              <Button variant="outline" size="sm">Ver</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageTemplate>
  );
}
