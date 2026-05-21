import { PageWithPermissions, PageTemplate } from '@/components/shared';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, BookOpen, MessageCircle, Video, FileText } from 'lucide-react';

export default async function AyudaPage() {
  return (
    <PageWithPermissions sectionCode="PAGES" subsectionCode="HELP">
      <PageTemplate
        title="Centro de Ayuda"
        description="Encuentra respuestas a tus preguntas y aprende a usar el sistema"
      >
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar en la ayuda..."
            className="pl-10 h-12"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { icon: BookOpen, title: 'Guías', description: 'Tutoriales paso a paso' },
          { icon: Video, title: 'Videos', description: 'Tutoriales en video' },
          { icon: FileText, title: 'Documentación', description: 'Docs técnica' },
          { icon: MessageCircle, title: 'Soporte', description: 'Contacta con soporte' },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-3 rounded-full bg-brand-primary/10">
                    <Icon className="h-6 w-6 text-brand-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
          <CardDescription>Las dudas más comunes de nuestros usuarios</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cómo inicio sesión en el sistema?</AccordionTrigger>
              <AccordionContent>
                Para iniciar sesión, ingresa tu usuario y contraseña en la página de login. Si olvidaste tu contraseña, haz clic en "¿Olvidaste tu contraseña?" para recuperarla.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Cómo puedo cambiar mi contraseña?</AccordionTrigger>
              <AccordionContent>
                Ve al menú de perfil en la esquina superior derecha, selecciona "Configuración" y luego "Cambiar contraseña".
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Cómo exporto los reportes?</AccordionTrigger>
              <AccordionContent>
                En cada tabla de datos encontrarás botones para exportar en diferentes formatos: Excel, PDF o CSV.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      </PageTemplate>
    </PageWithPermissions>
  );
}
