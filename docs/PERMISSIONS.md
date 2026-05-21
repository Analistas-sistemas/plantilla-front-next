# Sistema de Permisos

Sistema de verificación de permisos para proteger páginas y funcionalidades en Next.js App Router.

## Arquitectura

El sistema se compone de:

1. **API de Permisos** (`lib/permissions/`) - Obtiene y cachea permisos desde el backend
2. **Componentes de Protección** (`components/shared/`) - Guards para proteger contenido
3. **Página de Acceso Denegado** - Muestra errores de permisos al usuario

## Uso Básico

### Opción 1: PageWithPermissions (Recomendado)

La forma más simple de proteger una página completa usando códigos de sección/subsección:

```tsx
import { PageWithPermissions } from '@/components/shared';
import { PageContainer } from '@/components/shared';

export default async function MiPagina() {
  return (
    <PageWithPermissions
      sectionCode="UIKIT"
      subsectionCode="TOURS"
      requireRead={true}
    >
      <PageContainer title="Mi Página Protegida">
        {/* Contenido visible solo con permisos de lectura */}
      </PageContainer>
    </PageWithPermissions>
  );
}
```

### Opción 2: PermissionGuard (IDs directos)

Si ya tienes los IDs de sección y subsección:

```tsx
import { PermissionGuard } from '@/components/shared';

export default async function MiPagina() {
  return (
    <PermissionGuard
      sectionId={3}
      subsectionId={20}
      moduloCodigo="DEV_MOCK"
      requireRead={true}
      requireWrite={false}
    >
      {/* Contenido protegido */}
    </PermissionGuard>
  );
}
```

## Mapeo de Códigos

### Secciones Principales

| Código Backend | Nombre | Section ID |
|----------------|--------|------------|
| `INICIO` | Inicio | 17 |
| `UIKIT` | Kit de Interfaz | 3 |
| `PAGES` | Páginas | 6 |
| `REPORTES` | Reportes | 10 |

### Subsecciones Comunes

#### Inicio (INICIO)
- `ACCESO` → Acceso Rápido (ID: 49)

#### Kit de Interfaz (UIKIT)
- `TOURS` → Tours (ID: 20)
- `FORM_LAYOUT` → Diseño de Formulario (ID: 30)
- `INPUT` → Entrada (ID: 31)
- `BUTTON` → Botón (ID: 32)
- `TABLE` → Tabla (ID: 33)
- `LIST` → Lista (ID: 34)
- `TREE` → Árbol (ID: 35)
- `PANEL` → Panel (ID: 36)
- `OVERLAY` → Superposición (ID: 37)
- `MEDIA` → Medios (ID: 38)
- `MENU` → Menú (ID: 39)

#### Páginas (PAGES)
- `CRUD` → CRUD (ID: 62)
- `HELP` → Ayuda (ID: 64)
- `OOPS` → Ups (ID: 65)
- `NOT_FOUND` → No Encontrado (ID: 66)
- `EMPTY` → Vacío (ID: 67)
- `FAQ` → Preguntas Frecuentes (ID: 68)
- `CONTACT_US` → Contáctanos (ID: 69)

#### Reportes (REPORTES)
- `REPORTES_LIST` → Lista (ID: 100)
- `REPORTES_TABLE` → Tabla (ID: 101)
- `REPORTES_DETAIL` → Detalle Reporte (ID: 102)

## Tipos de Permisos

Cada módulo puede tener 4 tipos de permisos:

- **`requireRead`** - Permiso de lectura/visualización (por defecto: `true`)
- **`requireWrite`** - Permiso de creación (por defecto: `false`)
- **`requireUpdate`** - Permiso de actualización (por defecto: `false`)
- **`requireDelete`** - Permiso de eliminación (por defecto: `false`)

### Ejemplo con múltiples permisos:

```tsx
<PageWithPermissions
  sectionCode="PAGES"
  subsectionCode="CRUD"
  requireRead={true}
  requireWrite={true}
  requireUpdate={true}
>
  {/* Usuario necesita permisos de leer, crear y actualizar */}
</PageWithPermissions>
```

## Protección Granular

Para proteger partes específicas de una página, usa múltiples guards:

```tsx
export default async function MiPagina() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="TOURS">
      <PageContainer title="Tours">
        {/* Todos pueden ver esto */}
        <div>Contenido público</div>
        
        {/* Solo quienes pueden escribir */}
        <PermissionGuard
          sectionId={3}
          subsectionId={20}
          requireWrite={true}
        >
          <Button>Crear Nuevo Tour</Button>
        </PermissionGuard>
      </PageContainer>
    </PageWithPermissions>
  );
}
```

## Respuesta del Backend

El endpoint `/api/v1/permisos/section/:sectionId/subsection/:subsectionId` retorna:

```json
{
  "success": true,
  "data": [
    {
      "id": 999,
      "numero": 1,
      "codigo": "DEV_MOCK",
      "descripcion": "Full permissions for development",
      "permisos": {
        "crear": true,
        "leer": true,
        "actualizar": true,
        "eliminar": true
      }
    }
  ]
}
```

## Página de Acceso Denegado

Cuando un usuario no tiene permisos, es redirigido a `/acceso-denegado` con un parámetro `reason`:

- `error` - Error al verificar permisos
- `no-module` - Módulo no encontrado
- `insufficient` - Permisos insuficientes
- `no-access` - Sin acceso a la sección

## Cache de Permisos

Los permisos se cachean en el servidor por **5 minutos** para optimizar el rendimiento.

Para limpiar el cache manualmente:

```tsx
import { clearPermisosCache } from '@/lib/permissions';

// Limpiar cache específico
clearPermisosCache(sectionId, subsectionId);

// Limpiar todo el cache
clearPermisosCache();
```

## Funciones Utilitarias

```tsx
import {
  getPermissionsForSection,
  canReadModulo,
  canWriteModulo,
  canUpdateModulo,
  canDeleteModulo,
} from '@/lib/permissions';

// Obtener permisos
const perms = await getPermissionsForSection(3, 20);

// Verificar permisos específicos
const puedeVer = canReadModulo(perms.modulosPermisos, 'DEV_MOCK');
const puedeCrear = canWriteModulo(perms.modulosPermisos, 'DEV_MOCK');
```

## Ejemplo Completo

```tsx
import { PageWithPermissions, PageContainer, ContentCard } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { PermissionGuard } from '@/components/shared';

export default async function ToursPage() {
  return (
    <PageWithPermissions
      sectionCode="UIKIT"
      subsectionCode="TOURS"
      requireRead={true}
    >
      <PageContainer
        title="Tours"
        description="Gestión de tours guiados"
      >
        <ContentCard title="Lista de Tours">
          {/* Contenido visible con permiso de lectura */}
          <p>Lista de tours disponibles...</p>
        </ContentCard>

        {/* Botón visible solo con permiso de escritura */}
        <PermissionGuard
          sectionId={3}
          subsectionId={20}
          requireWrite={true}
        >
          <Button>Crear Nuevo Tour</Button>
        </PermissionGuard>
      </PageContainer>
    </PageWithPermissions>
  );
}
```

## Notas Importantes

1. **Server Components Only**: Los guards solo funcionan en Server Components
2. **Async**: Las páginas con guards deben ser `async function`
3. **Redirección**: Si no hay permisos, se redirige automáticamente
4. **Cache**: Los permisos se cachean en el servidor (no en el cliente)
5. **Cookies**: El sistema usa cookies automáticamente para autenticación
