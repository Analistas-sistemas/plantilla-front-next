# Plantilla Frontend Next.js

Plantilla moderna para aplicaciones administrativas con Next.js 16 App Router, TypeScript, Tailwind CSS y shadcn/ui.

## 🚀 Características

### Infraestructura Core
- ✅ **Next.js 16 App Router** - Routing basado en carpetas con Server Components
- ✅ **TypeScript 5** - Tipado estricto en todo el proyecto
- ✅ **Tailwind CSS 4** - Utilidades CSS modernas
- ✅ **shadcn/ui (Nova preset)** - Componentes accesibles y personalizables
- ✅ **React 19** - Última versión con Server/Client Components

### Autenticación & Seguridad
- ✅ **SSO con Cookies** - Autenticación mediante cookies httpOnly del sistema centralizado
- ✅ **Middleware de protección** - Guards automáticos en todas las rutas
- ✅ **Decodificación JWT** - Extracción de usuario desde tokens
- ✅ **Permisos por módulo** - Sistema de autorización granular

### API & Data Fetching
- ✅ **Cliente API centralizado** - Fetch wrapper con interceptores
- ✅ **Manejo de errores** - Interceptores de request/response
- ✅ **Loading states** - Gestión global de estados de carga
- ✅ **Cache inteligente** - TTL para menús (10min) y permisos (5min)

### Componentes de Layout
- ✅ **Sidebar colapsable** - Navegación con menú recursivo
- ✅ **Header dinámico** - Breadcrumbs + perfil de usuario
- ✅ **Dashboard layout** - Layout Server Component con data fetching
- ✅ **Menú dinámico** - Cargado desde API con cache

### DataTable Component 🆕
- ✅ **TanStack Table v8** - Gestión avanzada de tablas
- ✅ **Paginación client-side** - Controles de navegación
- ✅ **Búsqueda global** - Filtrado normalizado (sin acentos)
- ✅ **Ordenamiento multi-columna** - Click en headers
- ✅ **Selección de filas** - Checkboxes múltiples
- ✅ **Acciones por fila** - Dropdown menu con permisos
- ✅ **Exportación Excel** - xlsx library integrada
- ✅ **Formateo de tipos** - Currency, Date, Number, Boolean, Dropdown
- ✅ **TypeScript completo** - Interfaces tipadas

Ver [documentación completa del DataTable](./docs/DATA_TABLE.md)

### Sistema de Colores 🎨
- ✅ **Paleta V1** - Colores principales (Primary, Secondary, Success, Export, Warning, Danger, Info)
- ✅ **Paleta V2** - Colores alternativos para variaciones de UI
- ✅ **Estados interactivos** - Hover, Active, Disabled para cada color
- ✅ **Integración Tailwind** - Clases utilitarias (`bg-brand-primary`, `text-success`, etc.)
- ✅ **CSS Variables** - Variables CSS personalizadas (`var(--color-primary)`)
- ✅ **Accesibilidad** - Colores compatibles con WCAG 2.1

Ver [documentación de colores](./docs/COLORS.md) y la [página de demostración](http://localhost:3000/colores)

## 📦 Stack Tecnológico

### Core
- **Next.js** 16.2.6 (App Router)
- **React** 19.2.4
- **TypeScript** 5.7.3
- **Tailwind CSS** 4.0.4

### UI Components
- **shadcn/ui** con preset Nova
- **Radix UI** (primitivos accesibles)
- **Lucide React** (iconos)

### Data Management
- **@tanstack/react-table** 8.21.1 - Tablas avanzadas
- **xlsx** 0.18.5 - Exportación Excel
- **date-fns** 4.1.0 - Manipulación de fechas
- **jwt-decode** 4.0.0 - Decodificación JWT

### Dev Tools
- **ESLint** 9
- **PostCSS**

## 🛠️ Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd plantilla-frontend-next

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## ⚙️ Configuración

### Variables de Entorno

Crear `.env.local`:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://128.1.21.44:3100/plantillaWS/
NEXT_PUBLIC_AUTH_URL=http://128.1.21.44:3100
NEXT_PUBLIC_REQUEST_TIMEOUT=30000

# Autenticación
NEXT_PUBLIC_CENTRAL_LOGIN_URL=http://128.1.21.44:3100/login

# Configuración
NEXT_PUBLIC_APP_NAME=Sistema Administrativo
```

**IMPORTANTE**: El archivo `.env.local` ya está configurado con tu backend. Si necesitas cambiar la URL, edita las variables que inician con `NEXT_PUBLIC_`.

Ver configuración completa en [lib/config/env.ts](./lib/config/env.ts)

## 📁 Estructura del Proyecto

```
plantilla-frontend-next/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Grupo de rutas autenticadas
│   │   ├── layout.tsx           # Layout principal con menú
│   │   └── ejemplo-tabla/       # Ejemplo de DataTable
│   ├── globals.css              # Estilos globales
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Página de inicio
├── components/
│   ├── layout/                  # Componentes de layout
│   │   ├── header.tsx           # Header con breadcrumbs
│   │   ├── sidebar.tsx          # Sidebar colapsable
│   │   ├── sidebar-item.tsx     # Item de menú
│   │   └── profile-menu.tsx     # Menú de perfil
│   ├── shared/                  # Componentes compartidos
│   │   └── data-table.tsx       # DataTable principal ⭐
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── api/                     # Cliente API
│   │   ├── client.ts            # Fetch wrapper
│   │   └── loading.tsx          # Loading manager
│   ├── auth/                    # Sistema de autenticación
│   │   ├── server.ts            # Server-side auth
│   │   ├── cookies.ts           # Cookie management
│   │   └── token.ts             # JWT decoding
│   ├── config/                  # Configuración
│   │   └── env.ts               # Variables de entorno
│   ├── data-table/              # Utilidades DataTable ⭐
│   │   ├── formatters.ts        # Formateo de datos
│   │   ├── export.ts            # Exportación Excel/CSV
│   │   └── index.ts             # Barrel exports
│   ├── menu/                    # Sistema de menús
│   │   ├── menu-loader.ts       # Carga de menús
│   │   └── icon-mapping.ts      # Mapeo de iconos
│   ├── permissions/             # Sistema de permisos
│   │   └── permissions.ts       # Verificación de permisos
│   └── utils.ts                 # Utilidades generales
├── types/                       # Definiciones TypeScript
│   ├── data-table.ts            # Tipos del DataTable ⭐
│   ├── menu.ts                  # Tipos de menú
│   └── user.ts                  # Tipos de usuario
├── middleware.ts                # Middleware de autenticación
├── docs/                        # Documentación
    ├── DATA_TABLE.md            # Guía completa DataTable
    └── COLORS.md                # Sistema de colores ⭐
```

## 🎨 Componentes shadcn/ui Instalados

```bash
# Componentes disponibles
button, dialog, table, breadcrumb, avatar, dropdown-menu, 
sheet, separator, badge, collapsible, scroll-area, input, 
checkbox, popover, calendar, select
```

## 📖 Guías de Uso
Sistema de Colores

```tsx
// Usar colores con Tailwind
<Button className="bg-brand-primary hover:bg-brand-primary-hover text-text-light">
  Guardar
</Button>

<Badge className="bg-success text-white">Aprobado</Badge>
<Badge className="bg-danger text-white">Rechazado</Badge>

// Usar variables CSS
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Custom styling
</div>

// Alerts con colores
<div className="bg-success/10 border border-success text-success-active p-4 rounded-lg">
  Mensaje de éxito
</div>
```

Ver todos los colores en [/colores](http://localhost:3000/colores) o en la [documentación](./docs/COLORS.md)

### 
### Crear una Página CRUD

```tsx
'use client';

import { DataTable } from '@/components/shared/data-table';
import { ColumnType } from '@/types/data-table';

export default function ProductosPage() {
  const config = {
    columns: [
      { field: 'nombre', header: 'Producto', type: ColumnType.TEXT },
      { field: 'precio', header: 'Precio', type: ColumnType.CURRENCY },
    ],
    data: productos,
    selection: true,
    rowActions: [
      { label: 'Editar', action: (row) => handleEdit(row) },
      { label: 'Eliminar', action: (row) => handleDelete(row), severity: 'destructive' },
    ],
  };

  return <DataTable config={config} />;
}
```

Ver más ejemplos en [docs/DATA_TABLE.md](./docs/DATA_TABLE.md)

### Usar la API

```tsx
import { apiClient } from '@/lib/api/client';

// GET request
const productos = await apiClient.get<Producto[]>('/productos');

// POST request
const nuevo = await apiClient.post<Producto>('/productos', {
  nombre: 'Nuevo producto',
  precio: 100,
});
```

### Verificar Permisos

```tsx
import { canWriteModulo } from '@/lib/permissions/permissions';

const permisos = await canWriteModulo('PRODUCTOS');
if (permisos) {
  // Usuario puede crear/editar productos
}
```

## 🔒 Sistema de Autenticación

La autenticación se maneja mediante cookies httpOnly del sistema centralizado:

1. **Middleware** verifica cookies en cada request
2. Si no autenticado → redirect a login centralizado
3. **getUserSession()** extrae datos del token JWT
4. **getCodigoPersonaFromToken()** obtiene ID de usuario

Las cookies soportadas:
- `nettalco_token`
- `ACCESS_TOKEN`
- `access_token`

## 🚧 Roadmap

### Fase 1: Infraestructura ✅
- [x] API Client con interceptores
- [x] Sistema de autenticación (cookies SSO)
- [x] Middleware de protección
- [x] Menú dinámico con cache
- [x] Sistema de permisos

### Fase 2: Layout ✅
- [x] Header con breadcrumbs
- [x] Sidebar colapsable
- [x] Dashboard layout (Server Component)
- [x] Perfil de usuario

### Fase 3: DataTable ✅
- [x] Componente base con TanStack Table
- [x] Paginación y ordenamiento
- [x] Búsqueda global
- [x] Selección de filas
- [x] Acciones con permisos
- [x] Exportación Excel
- [x] Formateo de tipos

### Fase 4: Componentes CRUD (Siguiente)
- [ ] Formularios dinámicos
- [ ] Validación con Zod
- [ ] Diálogos de confirmación
- [ ] Toast notifications
- [ ] File upload component

### Fase 5: Optimizaciones
- [ ] Server-side pagination (lazy loading)
- [ ] Filtros por columna
- [ ] Responsive avanzado
- [ ] Tests unitarios
- [ ] Documentación Storybook

## 📚 Documentación Adicional

- [DataTable Component](./docs/DATA_TABLE.md) - Guía completa del componente de tabla
- [Next.js Docs](https://nextjs.org/docs) - Documentación oficial de Next.js
- [shadcn/ui](https://ui.shadcn.com) - Documentación de componentes UI
- [TanStack Table](https://tanstack.com/table/latest) - Docs de React Table

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Proyecto privado - Nettalco © 2024
