# Sistema de Colores

Paleta de colores completa del proyecto con dos versiones: **V1** (colores principales) y **V2** (variantes alternativas).

## 🎨 Uso en Componentes

### Con Tailwind CSS

```tsx
// Background colors
<div className="bg-brand-primary hover:bg-brand-primary-hover">
  Botón Primary
</div>

// Text colors
<span className="text-brand-secondary">Texto secundario</span>

// Border colors
<div className="border border-success">Borde success</div>

// Disabled state
<button className="bg-brand-primary-disabled cursor-not-allowed">
  Deshabilitado
</button>
```

### Con CSS Variables

```tsx
// En componentes con estilos inline
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Custom background
</div>

// En archivos CSS
.custom-button {
  background-color: var(--color-primary);
  color: var(--color-text-light);
}

.custom-button:hover {
  background-color: var(--color-primary-hover);
}
```

## 📋 Paleta de Colores

### Version 1 - Colores Principales

#### Primary (Azul Oscuro)
- **Base**: `#082853` → `bg-brand-primary` / `var(--color-primary)`
- **Hover**: `#22436F` → `bg-brand-primary-hover` / `var(--color-primary-hover)`
- **Active**: `#2B5DA1` → `bg-brand-primary-active` / `var(--color-primary-active)`
- **Disabled**: `#6B7280` → `bg-brand-primary-disabled` / `var(--color-primary-disabled)`

**Uso**: Botones principales, headers, navegación principal

#### Secondary (Azul Brillante)
- **Base**: `#3F8CF9` → `bg-brand-secondary`
- **Hover**: `#5A9FFC` → `bg-brand-secondary-hover`
- **Active**: `#5398F8` → `bg-brand-secondary-active`
- **Disabled**: `#CAD8F1` → `bg-brand-secondary-disabled`

**Uso**: Botones secundarios, enlaces destacados

#### Success (Celeste)
- **Base**: `#2BA5CD` → `bg-success`
- **Hover**: `#45B1CE` → `bg-success-hover`
- **Active**: `#3CAAC8` → `bg-success-active`
- **Disabled**: `#D6E5FA` → `bg-success-disabled`

**Uso**: Confirmaciones, estados exitosos, badges positivos

#### Export (Azul Petróleo)
- **Base**: `#09718A` → `bg-export`
- **Hover**: `#258FA6` → `bg-export-hover`
- **Active**: `#1A859D` → `bg-export-active`
- **Disabled**: `#8CC3D7` → `bg-export-disabled`

**Uso**: Botones de exportación (Excel, PDF, CSV)

#### Warning (Naranja)
- **Base**: `#D57952` → `bg-warning`
- **Hover**: `#D78158` → `bg-warning-hover`
- **Active**: `#DE956A` → `bg-warning-active`
- **Disabled**: `#E4DBE7` → `bg-warning-disabled`

**Uso**: Advertencias, estados de precaución, alertas informativas

#### Danger (Rojo)
- **Base**: `#DC2626` → `bg-danger`
- **Hover**: `#EF4444` → `bg-danger-hover`
- **Active**: `#B91C1C` → `bg-danger-active`
- **Disabled**: `#FECACA` → `bg-danger-disabled`

**Uso**: Eliminación, errores, acciones destructivas

#### Info (Azul Claro)
- **Base**: `#66A6FB` → `bg-info`
- **Hover**: `#7CB2FA` → `bg-info-hover`
- **Active**: `#B4D3FD` → `bg-info-active`
- **Disabled**: `#ABC9F9` → `bg-info-disabled`

**Uso**: Información general, tooltips, mensajes informativos

#### Text Colors
- **Light**: `#ffffff` → `text-text-light` / `var(--color-text-light)`
- **Dark**: `#082853` → `text-text-dark` / `var(--color-text-dark)`

**Uso**: Colores de texto sobre fondos claros/oscuros

---

### Version 2 - Colores Alternativos

#### Primary V2 (Azul Muy Claro)
- **Base**: `#EDF4FF` → `bg-v2-primary`
- **Hover**: `#EEF4FF` → `bg-v2-primary-hover`
- **Active**: `#336DD9` → `bg-v2-primary-active`
- **Disabled**: `#0A1D49` → `bg-v2-primary-disabled`

**Uso**: Fondos suaves, cards, secciones destacadas

#### Secondary V2 (Azul Medio)
- **Base**: `#3A72E0` → `bg-v2-secondary`
- **Hover**: `#2B5FBC` → `bg-v2-secondary-hover`
- **Active**: `#1F498E` → `bg-v2-secondary-active`
- **Disabled**: `#0C3D5C` → `bg-v2-secondary-disabled`

**Uso**: Botones secundarios alternativos, tags

#### Success V2 (Turquesa)
- **Base**: `#6ECBCD` → `bg-v2-success`
- **Hover**: `#19819D` → `bg-v2-success-hover`
- **Active**: `#0C566F` → `bg-v2-success-active`
- **Disabled**: `#0C3D5C` → `bg-v2-success-disabled`

**Uso**: Variante de success para contraste

#### Warning V2 (Amarillo)
- **Base**: `#F4B33C` → `bg-v2-warning`
- **Hover**: `#F2A61E` → `bg-v2-warning-hover`
- **Active**: `#CA8825` → `bg-v2-warning-active`
- **Disabled**: `#9D6A2D` → `bg-v2-warning-disabled`

**Uso**: Advertencias alternativas, estados pendientes

#### Info V2 (Azul Medio Claro)
- **Base**: `#69A7ED` → `bg-v2-info`
- **Hover**: `#5389DB` → `bg-v2-info-hover`
- **Active**: `#4775BF` → `bg-v2-info-active`
- **Disabled**: `#40609B` → `bg-v2-info-disabled`

**Uso**: Información secundaria, badges informativos

#### Text V2
- **Dark**: `#0A1D49` → `text-v2-text-dark` / `var(--v2-text-dark)`
- **Light**: `#ffffff` → `text-v2-text-light` / `var(--v2-text-light)`

---

## 🧩 Ejemplos de Uso

### Utilidades de Color (TypeScript)

```tsx
import {
  getColorClass,
  getInteractiveColorClass,
  getButtonColorClasses,
  badgeVariants,
  alertVariants,
} from '@/lib/utils/colors';

// Obtener clase individual
const bgClass = getColorClass('primary', 'base', 'v1', 'bg');
// → 'bg-brand-primary'

// Clases interactivas (con hover y active)
const interactiveClass = getInteractiveColorClass('success', 'v1', 'bg');
// → 'bg-success hover:bg-success-hover active:bg-success-active transition-colors duration-200'

// Clases completas para botón
const buttonClasses = getButtonColorClasses('primary', 'v1', true);
// → Incluye bg, hover, active, disabled y text classes

// Usar variantes predefinidas
<Badge className={badgeVariants.success}>Aprobado</Badge>
<div className={`border ${alertVariants.warning} p-4 rounded-lg`}>
  Advertencia
</div>
```

### Botones

```tsx
// Primary button
<Button className="bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-active text-text-light">
  Guardar
</Button>

// Secondary button
<Button className="bg-brand-secondary hover:bg-brand-secondary-hover text-white">
  Cancelar
</Button>

// Danger button
<Button className="bg-danger hover:bg-danger-hover active:bg-danger-active text-white">
  Eliminar
</Button>

// Export button
<Button className="bg-export hover:bg-export-hover text-white">
  <Download className="mr-2 h-4 w-4" />
  Exportar Excel
</Button>
```

### Badges

```tsx
import { Badge } from '@/components/ui/badge';

// Variantes personalizadas
<Badge variant="primary">Primary</Badge>
<Badge variant="brand-secondary">Secondary</Badge>
<Badge variant="success">Aprobado</Badge>
<Badge variant="export">Exportar</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="danger">Rechazado</Badge>
<Badge variant="info">En revisión</Badge>

// Variantes de shadcn/ui (también disponibles)
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

### Alerts

```tsx
<div className="bg-success/10 border border-success text-success-active p-4 rounded-lg">
  <p className="font-semibold">¡Éxito!</p>
  <p>La operación se completó correctamente.</p>
</div>

<div className="bg-warning/10 border border-warning text-warning-active p-4 rounded-lg">
  <p className="font-semibold">Advertencia</p>
  <p>Revise los datos antes de continuar.</p>
</div>

<div className="bg-danger/10 border border-danger text-danger-active p-4 rounded-lg">
  <p className="font-semibold">Error</p>
  <p>No se pudo completar la operación.</p>
</div>
```

### Cards con Version 2

```tsx
<div className="bg-v2-primary border border-v2-primary-active p-6 rounded-lg">
  <h3 className="text-v2-text-dark font-semibold mb-2">Tarjeta Destacada</h3>
  <p className="text-muted-foreground">
    Contenido con fondo suave de la paleta V2
  </p>
</div>
```

### Iconos de Estado

```tsx
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

<CheckCircle2 className="text-success" />
<AlertTriangle className="text-warning" />
<XCircle className="text-danger" />
<Info className="text-info" />
```

### DataTable con Colores

```tsx
const tableConfig: DataTableConfig = {
  // ...
  rowActions: [
    {
      label: 'Editar',
      icon: 'edit',
      className: 'text-brand-secondary hover:text-brand-secondary-hover',
      action: (row) => handleEdit(row),
    },
    {
      label: 'Eliminar',
      icon: 'trash',
      className: 'text-danger hover:text-danger-hover',
      severity: 'destructive',
      action: (row) => handleDelete(row),
    },
  ],
};
```

## 🎯 Guías de Uso

### Cuándo usar V1 vs V2

**Version 1** (Colores principales):
- Interfaces de administración
- Acciones principales (CRUD)
- Botones de formularios
- Estados del sistema

**Version 2** (Colores alternativos):
- Fondos suaves y secciones
- Variantes de UI cuando V1 no contrasta
- Dashboards y reportes
- Elementos decorativos

### Accesibilidad

Todos los colores cumplen con WCAG 2.1:
- Text-light sobre colores base: **AAA** (contrast ratio > 7:1)
- Text-dark sobre fondos claros V2: **AA** (contrast ratio > 4.5:1)

### Estados Interactivos

```tsx
// Patrón estándar de estados
<button className="
  bg-brand-primary 
  hover:bg-brand-primary-hover 
  active:bg-brand-primary-active 
  disabled:bg-brand-primary-disabled
  transition-colors duration-200
">
  Botón con estados
</button>
```

## 📦 Referencia Rápida

### Clases Tailwind disponibles

```
// Primary V1
bg-brand-primary
bg-brand-primary-hover
bg-brand-primary-active
bg-brand-primary-disabled

// Secondary V1
bg-brand-secondary
bg-brand-secondary-hover
bg-brand-secondary-active
bg-brand-secondary-disabled

// Success
bg-success
bg-success-hover
bg-success-active
bg-success-disabled

// Export
bg-export
bg-export-hover
bg-export-active
bg-export-disabled

// Warning
bg-warning
bg-warning-hover
bg-warning-active
bg-warning-disabled

// Danger
bg-danger
bg-danger-hover
bg-danger-active
bg-danger-disabled

// Info
bg-info
bg-info-hover
bg-info-active
bg-info-disabled

// V2 Colors (same pattern)
bg-v2-primary
bg-v2-secondary
bg-v2-success
bg-v2-warning
bg-v2-info
```

Reemplace `bg-` con `text-`, `border-`, etc. según necesite.

## 🔧 Extensión

Para agregar nuevos colores, edita `app/globals.css`:

```css
:root {
  /* Nuevo color */
  --color-custom: #HEXCODE;
  --color-custom-hover: #HEXCODE;
}

@theme inline {
  --color-custom: var(--color-custom);
  --color-custom-hover: var(--color-custom-hover);
}
```

Luego úsalo con: `bg-custom` o `var(--color-custom)`
