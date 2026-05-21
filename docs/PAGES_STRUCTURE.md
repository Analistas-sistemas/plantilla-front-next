# Estructura de Páginas

Este documento describe la organización modular de páginas del sistema.

## 📁 Estructura de Carpetas

```
app/(dashboard)/
├── page.tsx                    # Página de Inicio
├── layout.tsx                  # Layout principal del dashboard
└── kit-de-interfaz/           # Sección de componentes UI
    ├── tours/                 # Guías interactivas
    ├── diseno-formulario/     # Formularios
    ├── entrada/               # Inputs y campos
    ├── boton/                 # Botones
    ├── tabla/                 # Tablas
    ├── lista/                 # Listas
    ├── arbol/                 # Vistas de árbol
    ├── panel/                 # Paneles y alertas
    ├── superposicion/         # Modales y overlays
    ├── medios/                # Avatares e imágenes
    └── menu/                  # Menús desplegables
```

## 🧩 Componentes Reutilizables

### PageContainer
Contenedor estándar para todas las páginas con título y descripción.

```tsx
import { PageContainer } from '@/components/shared/page-container';

<PageContainer
  title="Título de la Página"
  description="Descripción opcional"
>
  {/* Contenido */}
</PageContainer>
```

### ContentCard
Card para organizar secciones de contenido dentro de las páginas.

```tsx
import { ContentCard } from '@/components/shared/content-card';

<ContentCard
  title="Título de la Sección"
  description="Descripción opcional"
  headerAction={<Button>Acción</Button>}
>
  {/* Contenido */}
</ContentCard>
```

## 📝 Cómo Crear una Nueva Página

1. **Crear carpeta y archivo**
   ```
   app/(dashboard)/mi-seccion/page.tsx
   ```

2. **Usar el patrón base**
   ```tsx
   import { PageContainer } from '@/components/shared/page-container';
   import { ContentCard } from '@/components/shared/content-card';

   export default function MiSeccionPage() {
     return (
       <PageContainer
         title="Mi Sección"
         description="Descripción de mi sección"
       >
         <ContentCard title="Contenido Principal">
           {/* Tu contenido aquí */}
         </ContentCard>
       </PageContainer>
     );
   }
   ```

3. **Configurar la ruta en el menú**
   - El menú se carga dinámicamente desde el backend
   - Asegúrate de que la ruta en la BD coincida con la carpeta creada

## 🎨 Convenciones de Estilo

- **Títulos**: `text-3xl font-bold text-brand-primary`
- **Descripciones**: `text-muted-foreground`
- **Cards**: `rounded-lg border bg-card p-6 shadow-sm`
- **Espaciado**: Usa `space-y-6` para secciones principales

## 📦 Componentes Compartidos Disponibles

- `PageContainer` - Contenedor de página estándar
- `ContentCard` - Card de contenido
- `DataTable` - Tabla con paginación y filtros
- `LoadingOverlay` - Overlay de carga global

## 🔍 Componentes UI (shadcn/ui)

Todos los componentes de shadcn/ui están disponibles en `@/components/ui/`:

- `Button`, `Input`, `Select`, `Checkbox`
- `Dialog`, `Sheet`, `Alert`
- `Table`, `Badge`, `Avatar`
- Y más...

## 🚀 Server vs Client Components

- **Por defecto**: Usar Server Components (sin 'use client')
- **Client Components**: Solo cuando necesites:
  - State (`useState`, `useReducer`)
  - Effects (`useEffect`, `useLayoutEffect`)
  - Event handlers (`onClick`, `onChange`)
  - Browser APIs (`window`, `localStorage`)

## 📱 Responsive Design

Usa las clases de Tailwind para responsive:

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {/* Se adapta: 1 col móvil, 2 tablet, 4 desktop */}
</div>
```

## ✅ Checklist para Nuevas Páginas

- [ ] Usa `PageContainer` para layout consistente
- [ ] Agrupa contenido en `ContentCard`
- [ ] Títulos en `text-brand-primary`
- [ ] Responsive con grid de Tailwind
- [ ] Server Component por defecto
- [ ] TypeScript strict (interfaces definidas)
- [ ] Sin estilos inline (solo Tailwind)
