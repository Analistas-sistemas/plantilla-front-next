import { PageWithPermissions } from '@/components/guards';
import { PageTemplate } from '@/components/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle } from 'lucide-react';

export default async function PreguntasFrecuentesPage() {
  const categories = [
    {
      title: 'Inicio de Sesión y Acceso',
      questions: [
        {
          q: '¿Cómo recupero mi contraseña?',
          a: 'Haz clic en "¿Olvidaste tu contraseña?" en la página de login. Recibirás un correo con instrucciones para restablecerla.',
        },
        {
          q: '¿Por qué no puedo acceder al sistema?',
          a: 'Verifica que tu usuario esté activo, que estés usando las credenciales correctas y que tu navegador esté actualizado.',
        },
      ],
    },
    {
      title: 'Funcionalidades del Sistema',
      questions: [
        {
          q: '¿Cómo exporto datos a Excel?',
          a: 'En cualquier tabla, busca el botón de exportar (icono de descarga) en la esquina superior derecha. Selecciona "Excel" del menú desplegable.',
        },
        {
          q: '¿Puedo personalizar el dashboard?',
          a: 'Sí, puedes personalizar widgets y el orden de las secciones desde Configuración > Personalización.',
        },
      ],
    },
    {
      title: 'Reportes y Datos',
      questions: [
        {
          q: '¿Con qué frecuencia se actualizan los datos?',
          a: 'Los datos se actualizan en tiempo real. Los reportes generados se actualizan según la configuración (diario, semanal, mensual).',
        },
        {
          q: '¿Puedo programar reportes automáticos?',
          a: 'Sí, en la sección de Reportes puedes configurar envíos automáticos por correo electrónico.',
        },
      ],
    },
    {
      title: 'Soporte Técnico',
      questions: [
        {
          q: '¿Cómo reporto un error?',
          a: 'Usa el botón "Reportar problema" en cualquier página o contacta con soporte técnico a través del formulario de contacto.',
        },
        {
          q: '¿Qué navegadores son compatibles?',
          a: 'El sistema funciona mejor en Chrome, Firefox, Edge y Safari (versiones recientes). No se recomienda Internet Explorer.',
        },
      ],
    },
  ];

  return (
    <PageWithPermissions sectionCode="PAGES" subsectionCode="FAQ">
      <PageTemplate
        title="Preguntas Frecuentes"
        description="Encuentra respuestas rápidas a las preguntas más comunes"
      >
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar pregunta..."
            className="pl-10 h-12"
          />
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-brand-primary" />
                {category.title}
              </CardTitle>
              <CardDescription>
                {category.questions.length} preguntas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem key={qIndex} value={`item-${categoryIndex}-${qIndex}`}>
                    <AccordionTrigger className="text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 bg-brand-primary/5 border-brand-primary/20">
        <CardContent className="pt-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            ¿No encontraste lo que buscabas?
          </p>
          <a href="/paginas/contactanos" className="text-brand-primary hover:underline font-medium">
            Contáctanos para más ayuda →
          </a>
        </CardContent>
      </Card>
      </PageTemplate>
    </PageWithPermissions>
  );
}
