# 📐 Arquitectura Corporativa Escalable

Estructura de proyecto Next.js (App Router) diseñada para aplicaciones empresariales escalables.

## 🎯 Principios de Diseño

### 1. Separación por Responsabilidad

- **`app/`** - Rutas y páginas (Next.js App Router)
- **`components/`** - Componentes reutilizables organizados por función
- **`lib/`** - Lógica de negocio, utilidades y configuración
- **`hooks/`** - Custom React Hooks
- **`store/`** - Estado global (Zustand)
- **`services/`** - Capa de servicios por dominio
- **`types/`** - Tipos TypeScript globales

### 2. Convención `_components/`

Componentes específicos de una ruta se colocan en carpetas con prefijo `_`:

```
app/
└── reportes/
    ├── page.tsx
    └── _components/          # ← Componentes SOLO usados en /reportes
        ├── reporte-tabla.tsx
        └── reporte-filtros.tsx
```

**Regla:** El prefijo `_` indica que el contenido es privado a esa ruta.

### 3. Estructura de `components/`

```
components/
├── ui/           # Primitivos shadcn/ui (sin lógica de negocio)
├── layout/       # Shell del dashboard (sidebar, header, breadcrumb)
├── common/       # Componentes reutilizables con lógica de negocio
└── guards/       # Wrappers de permisos y control de acceso
```

**Regla de decisión:**
- ¿Es un primitivo UI sin lógica? → `ui/`
- ¿Es parte del shell del dashboard? → `layout/`
- ¿Se usa en múltiples rutas? → `common/`
- ¿Controla permisos/acceso? → `guards/`
- ¿Solo se usa en 1 ruta? → `app/[ruta]/_components/`

### 4. Separación de Capas

#### Transporte vs. Lógica de Negocio

```typescript
// ❌ ANTES: Todo mezclado
async function getReportes() {
  const response = await fetch('/api/reportes');
  const data = await response.json();
  // procesamiento de negocio...
}

// ✅ DESPUÉS: Separado en capas

// lib/api/client.ts - Solo transporte HTTP
export const apiClient = {
  get: <T>(url: string) => fetch(url).then(r => r.json() as T)
}

// services/reportes.service.ts - Lógica de negocio
export const ReportesService = {
  getAll: () => apiClient.get<Reporte[]>('/reportes'),
  getById: (id: string) => apiClient.get<Reporte>(`/reportes/${id}`),
  transformData: (raw: RawReporte) => ({ /* lógica de transformación */ }),
}
```

#### Estado Local vs. Estado Global

```typescript
// Estado local - Usar useState/useReducer
function FormularioReporte() {
  const [formData, setFormData] = useState({});
  // ...
}

// Estado global - Usar Zustand stores
import { useAuthStore } from '@/store';

function Header() {
  const user = useAuthStore(state => state.user);
  // ...
}
```

### 5. Importaciones Organizadas

#### Usando Barrels (`index.ts`)

```typescript
// ✅ RECOMENDADO
import { PageContainer, ContentCard, DataTable } from '@/components/common';
import { PermissionGuard, PageWithPermissions } from '@/components/guards';
import type { Usuario, Reporte, ApiResponse } from '@/types';

// ❌ EVITAR
import { PageContainer } from '@/components/common/page-container';
import { ContentCard } from '@/components/common/content-card';
import { DataTable } from '@/components/common/data-table';
```

### 6. Utilidades Modularizadas

```typescript
// lib/utils/index.ts - Re-exporta todo
export * from './dates';
export * from './strings';
export { cn } from './cn';

// Uso
import { formatDate, capitalize, cn } from '@/lib/utils';
```

## 📁 Estructura Completa

```
plantilla-frontend-next/
│
├── app/                      # Next.js App Router
│   ├── (auth)/              # Grupo: autenticación pública
│   ├── (dashboard)/         # Grupo: rutas protegidas
│   │   ├── inicio/
│   │   │   └── _components/ # Componentes locales
│   │   ├── reportes/
│   │   │   ├── [id]/       # Rutas dinámicas
│   │   │   └── _components/
│   │   └── kit-de-interfaz/ # UI Kit interno
│   ├── error/
│   │   └── _components/
│   └── layout.tsx
│
├── components/
│   ├── ui/                  # shadcn/ui primitivos
│   ├── layout/              # Shell del dashboard
│   │   ├── sidebar/
│   │   ├── header/
│   │   └── breadcrumb/
│   ├── common/              # Componentes de negocio reutilizables
│   │   ├── data-table/
│   │   └── index.ts
│   └── guards/              # Control de acceso
│       └── index.ts
│
├── lib/                     # Lógica de negocio
│   ├── api/                 # Cliente HTTP
│   ├── auth/                # Autenticación
│   ├── config/              # Configuración
│   │   ├── env.ts
│   │   └── constants.ts
│   ├── permissions/         # Sistema de permisos
│   ├── utils/               # Utilidades
│   │   ├── dates.ts
│   │   ├── strings.ts
│   │   └── index.ts
│   └── ...
│
├── hooks/                   # Custom React Hooks
│   ├── use-loading.ts
│   ├── use-permissions.ts
│   ├── use-table.ts
│   └── use-breadcrumb.ts
│
├── store/                   # Estado global (Zustand)
│   ├── auth.store.ts
│   ├── ui.store.ts
│   └── index.ts
│
├── services/                # Servicios por dominio
│   └── index.ts
│
├── types/                   # Tipos TypeScript
│   ├── api.ts
│   ├── user.ts
│   ├── data-table.ts
│   └── index.ts            # Barrel exports
│
└── docs/                    # Documentación
```

## 🚀 Guía de Escalabilidad

### Agregar un Nuevo Módulo

1. **Crear la ruta:**
   ```
   app/(dashboard)/clientes/
   ├── page.tsx
   ├── [id]/page.tsx
   └── _components/
       ├── cliente-form.tsx
       └── cliente-tabla.tsx
   ```

2. **Crear el servicio:**
   ```typescript
   // services/clientes.service.ts
   export const ClientesService = {
     getAll: () => apiClient.get<Cliente[]>('/clientes'),
     // ...
   }
   ```

3. **Crear los tipos:**
   ```typescript
   // types/clientes.ts
   export interface Cliente {
     id: string;
     nombre: string;
     // ...
   }
   ```

4. **Actualizar barrels:**
   ```typescript
   // services/index.ts
   export * from './clientes.service';
   
   // types/index.ts
   export type * from './clientes';
   ```

### Cuándo Crear un Componente Común

**Crea en `components/common/` si:**
- Se usa en 2+ rutas diferentes
- Tiene lógica de negocio reutilizable
- Representa un patrón de UI consistente

**Mantén en `_components/` si:**
- Solo se usa en esa ruta específica
- Está acoplado a esa página
- Es muy específico del dominio de esa ruta

### Gestión de Estado

```typescript
// Estado UI (sidebar, theme)
import { useUIStore } from '@/store';

// Estado de autenticación
import { useAuthStore } from '@/store';

// Estado de dominio específico
// → Crear nuevo store en store/[dominio].store.ts
```

## 📚 Documentos Relacionados

- [Permisos](./docs/PERMISSIONS.md)
- [Tablas de Datos](./docs/DATA_TABLE.md)
- [Manejo de Errores](./docs/ERROR_HANDLING.md)
- [Mapeo de Rutas](./docs/ROUTE_MAPPING.md)
- [Estructura de Páginas](./docs/PAGES_STRUCTURE.md)

## ⚡ Mejoras Aplicadas

### Antes → Después

| Antes | Después | Beneficio |
|-------|---------|-----------|
| `components/shared/` | `components/common/` + `components/guards/` | Separación semántica clara |
| Sin `services/` | `services/[dominio].service.ts` | Lógica de negocio organizada |
| `lib/utils.ts` plano | `lib/utils/` modular | Escalabilidad |
| Sin estado global | `store/` con Zustand | Estado centralizado |
| Tipos dispersos | `types/index.ts` barrel | Import unificado |
| Componentes sueltos | `_components/` por ruta | Convención clara |

## 🎓 Mejores Prácticas

1. **Usa Server Components por defecto**, solo agrega `"use client"` cuando sea necesario
2. **Mantén componentes pequeños y modulares**
3. **Usa tipos estrictos** - evita `any`
4. **Aprovecha los barrels** - importa desde `index.ts`
5. **Separa transporte de lógica** - API client vs. Services
6. **Estado local primero** - solo usa stores para estado compartido
7. **Convención `_components/`** - mantén componentes locales privados
8. **Tailwind CSS** - usa `cn()` para clases condicionales

---

**Versión:** 1.0.0 | **Última actualización:** Mayo 2026
