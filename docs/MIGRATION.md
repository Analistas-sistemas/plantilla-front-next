# 🔄 Guía de Migración - Arquitectura Corporativa

Esta guía documenta los cambios aplicados para migrar a la arquitectura corporativa escalable.

## 📋 Resumen de Cambios

### 1. Reorganización de Componentes

#### `components/shared/` → `components/common/` + `components/guards/`

**Componentes movidos a `guards/`:**
- `permission-guard.tsx`
- `page-with-permissions.tsx`

**Componentes que permanecen (ahora en `common/`):**
- `page-container.tsx`
- `page-template.tsx`
- `content-card.tsx`
- `data-table.tsx`
- `loading-overlay.tsx`

#### Actualización de Imports

**ANTES:**
```typescript
import { PageWithPermissions, PageContainer } from '@/components/shared';
import { PermissionGuard } from '@/components/shared';
```

**DESPUÉS:**
```typescript
import { PageWithPermissions } from '@/components/guards';
import { PermissionGuard } from '@/components/guards';
import { PageContainer } from '@/components/common';
```

### 2. Componentes con Convención `_components/`

#### `app/error/back-button.tsx` → `app/error/_components/back-button.tsx`

**ANTES:**
```
app/error/
├── page.tsx
└── back-button.tsx
```

**DESPUÉS:**
```
app/error/
├── page.tsx
└── _components/
    └── back-button.tsx
```

**Actualización:**
```typescript
// ANTES
import { BackButton } from './back-button';

// DESPUÉS
import { BackButton } from './_components/back-button';
```

### 3. Nueva Estructura de Utilidades

#### `lib/utils.ts` → `lib/utils/`

**ANTES:**
```
lib/
└── utils.ts  # Solo función cn()
```

**DESPUÉS:**
```
lib/utils/
├── index.ts    # Re-exports + cn()
├── dates.ts    # Funciones de fechas
└── strings.ts  # Funciones de strings
```

**Nuevas funciones disponibles:**
```typescript
import {
  // Existente
  cn,
  
  // Nuevo - Fechas
  formatDate,
  formatDateTime,
  formatRelativeTime,
  isValidDate,
  
  // Nuevo - Strings
  capitalize,
  toTitleCase,
  truncate,
  slugify,
  formatNumber,
  formatCurrency,
} from '@/lib/utils';
```

### 4. Tipos Centralizados

#### Nuevo `types/index.ts` Barrel

**ANTES:**
```typescript
import { Usuario } from '@/types/user';
import { DataTableColumn } from '@/types/data-table';
import { AppError } from '@/types/errors';
```

**DESPUÉS:**
```typescript
import type { Usuario, DataTableColumn, AppError } from '@/types';
```

#### Nuevo archivo `types/api.ts`

Tipos para respuestas de API:
```typescript
import type { ApiResponse, ApiError, PaginatedResponse } from '@/types';
```

### 5. Estado Global con Zustand

#### Nuevos Stores Creados

**`store/auth.store.ts`**
```typescript
import { useAuthStore } from '@/store';

// Uso
const user = useAuthStore(state => state.user);
const isAuthenticated = useAuthStore(state => state.isAuthenticated);
```

**`store/ui.store.ts`**
```typescript
import { useUIStore } from '@/store';

// Uso
const sidebarCollapsed = useUIStore(state => state.sidebarCollapsed);
const toggleSidebar = useUIStore(state => state.toggleSidebar);
```

### 6. Nuevos Custom Hooks

#### `hooks/use-permissions.ts`

```typescript
import { usePermissions } from '@/hooks/use-permissions';

function MiComponente() {
  const { hasPermission, isAdmin } = usePermissions();
  
  if (!hasPermission({ modulo: 'REPORTES', permiso: 'READ' })) {
    return <AccessDenied />;
  }
  // ...
}
```

#### `hooks/use-table.ts`

```typescript
import { useTable } from '@/hooks/use-table';

function TablaComponente() {
  const {
    data,
    pagination,
    nextPage,
    previousPage,
    search,
  } = useTable(allData);
  
  // ...
}
```

#### `hooks/use-breadcrumb.ts`

```typescript
import { useBreadcrumb } from '@/hooks/use-breadcrumb';

function MiPagina() {
  const { items, setItems } = useBreadcrumb();
  // ...
}
```

### 7. Configuración Centralizada

#### Nuevo `lib/config/constants.ts`

```typescript
import { APP_CONFIG, PAGINATION, ROUTES } from '@/lib/config/constants';

// Uso
const pageSize = PAGINATION.defaultPageSize; // 10
const homePath = ROUTES.home; // '/inicio'
```

### 8. Capa de Servicios

#### Nueva carpeta `services/`

Preparado para implementar servicios por dominio:

```typescript
// services/reportes.service.ts
export const ReportesService = {
  getAll: () => apiClient.get<Reporte[]>('/reportes'),
  getById: (id: string) => apiClient.get<Reporte>(`/reportes/${id}`),
  create: (data: CreateReporteDto) => apiClient.post('/reportes', data),
}

// Uso
import { ReportesService } from '@/services';

const reportes = await ReportesService.getAll();
```

## 🔍 Archivos Actualizados

### Archivos de Código (7 archivos)

1. `app/layout.tsx`
2. `app/(dashboard)/page.tsx`
3. `app/(dashboard)/acceso-denegado/page.tsx`
4. `app/(dashboard)/inicio/page.tsx`
5. `app/(dashboard)/paginas/crud/page.tsx`
6. `app/(dashboard)/reportes/tabla/page.tsx`
7. `app/error/page.tsx`

### Archivos Nuevos Creados (18 archivos)

#### Utilidades y Configuración
- `lib/utils/index.ts`
- `lib/utils/dates.ts`
- `lib/utils/strings.ts`
- `lib/config/constants.ts`

#### Tipos
- `types/api.ts`
- `types/index.ts`

#### Estado Global
- `store/auth.store.ts`
- `store/ui.store.ts`
- `store/index.ts`

#### Hooks
- `hooks/use-permissions.ts`
- `hooks/use-table.ts`
- `hooks/use-breadcrumb.ts`

#### Componentes
- `components/guards/permission-guard.tsx`
- `components/guards/page-with-permissions.tsx`
- `components/guards/index.ts`
- `app/error/_components/back-button.tsx`

#### Servicios
- `services/index.ts`

#### Documentación
- `docs/ARCHITECTURE.md`

## ✅ Checklist de Migración

### Completado ✓

- [x] Crear estructura de `lib/utils/` con módulos
- [x] Crear `lib/config/constants.ts`
- [x] Crear `types/index.ts` barrel
- [x] Crear `types/api.ts`
- [x] Crear stores de Zustand (`auth`, `ui`)
- [x] Crear custom hooks (`use-permissions`, `use-table`, `use-breadcrumb`)
- [x] Crear `components/guards/` y mover componentes
- [x] Crear carpeta `services/` base
- [x] Mover `back-button.tsx` a `_components/`
- [x] Actualizar todos los imports en archivos de código
- [x] Instalar Zustand
- [x] Documentar arquitectura

### Pendiente (Opcional)

- [ ] Renombrar físicamente carpeta `components/shared/` → `components/common/`
- [ ] Actualizar ejemplos en documentación (README.md, docs/*.md)
- [ ] Crear servicios específicos por módulo
- [ ] Migrar estado local a stores donde aplique
- [ ] Crear más utilidades en `lib/utils/` según necesidad

## 🚨 Breaking Changes

### Imports que DEBEN actualizarse:

1. **Componentes de guards:**
   ```diff
   - import { PageWithPermissions } from '@/components/shared';
   + import { PageWithPermissions } from '@/components/guards';
   ```

2. **Componentes comunes:**
   ```diff
   - import { PageContainer } from '@/components/shared';
   + import { PageContainer } from '@/components/common';
   ```

3. **Back button en error:**
   ```diff
   - import { BackButton } from './back-button';
   + import { BackButton } from './_components/back-button';
   ```

### Imports Recomendados (No breaking):

```typescript
// Usar barrels para imports más limpios
import type { Usuario, ApiResponse } from '@/types';
import { formatDate, cn } from '@/lib/utils';
import { useAuthStore, useUIStore } from '@/store';
```

## 📚 Recursos

- [Documentación de Arquitectura](./ARCHITECTURE.md)
- [Guía de Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Next.js App Router](https://nextjs.org/docs/app)

---

**Migración completada:** Mayo 21, 2026
**Cambios aplicados sin errores de compilación:** ✅
