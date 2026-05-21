# DataTable Component

Componente de tabla avanzado para Next.js con paginación, filtrado, ordenamiento, selección y exportación a Excel.

## Características

✅ **Paginación** - Client-side con controles de navegación  
✅ **Búsqueda global** - Búsqueda normalizada (sin acentos, case-insensitive)  
✅ **Ordenamiento multi-columna** - Click en headers para ordenar ASC/DESC  
✅ **Selección de filas** - Checkboxes con selección múltiple  
✅ **Acciones por fila** - Dropdown menu con permisos configurables  
✅ **Exportación Excel** - Exporta datos filtrados con formato  
✅ **Formateo de tipos** - Currency, Date, Number, Boolean, Dropdown  
✅ **Responsive** - Adaptable a móviles (mejoras futuras)  
✅ **TypeScript** - Completamente tipado  

## Instalación

Las dependencias ya están instaladas:

```bash
npm install @tanstack/react-table xlsx date-fns
```

Componentes shadcn/ui necesarios (ya instalados):
- Table
- Button
- Input
- Checkbox
- DropdownMenu

## Uso Básico

```tsx
'use client';

import { DataTable } from '@/components/shared/data-table';
import type { DataTableConfig } from '@/types/data-table';
import { ColumnType } from '@/types/data-table';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

export default function ProductosPage() {
  const config: DataTableConfig<Producto> = {
    columns: [
      {
        field: 'nombre',
        header: 'Producto',
        type: ColumnType.TEXT,
        sortable: true,
      },
      {
        field: 'precio',
        header: 'Precio',
        type: ColumnType.CURRENCY,
        align: 'right',
        currencyDecimals: 2,
      },
      {
        field: 'stock',
        header: 'Stock',
        type: ColumnType.NUMBER,
        align: 'center',
      },
    ],
    data: productos,
    showGlobalSearch: true,
    showExportButton: true,
  };

  return <DataTable config={config} />;
}
```

## Configuración de Columnas

### Tipos de Columna

```tsx
import { ColumnType, FilterType } from '@/types/data-table';

const columns: DataTableColumn[] = [
  // Texto simple
  {
    field: 'nombre',
    header: 'Nombre',
    type: ColumnType.TEXT,
    sortable: true,
  },

  // Moneda (formato peruano: S/ 1,234.56)
  {
    field: 'precio',
    header: 'Precio',
    type: ColumnType.CURRENCY,
    align: 'right',
    currencyDecimals: 2,
    showCurrencySymbol: true,
  },

  // Número con formato personalizado
  {
    field: 'cantidad',
    header: 'Cantidad',
    type: ColumnType.NUMBER,
    numberFormat: '1.2-2', // min 2, max 2 decimales
    numberLocale: 'es-PE',
  },

  // Fecha (formato dd/MM/yyyy)
  {
    field: 'fechaCreacion',
    header: 'Creado',
    type: ColumnType.DATE,
    dateFormat: 'dd/MM/yyyy',
    align: 'center',
  },

  // Boolean (Sí/No)
  {
    field: 'activo',
    header: 'Activo',
    type: ColumnType.BOOLEAN,
    align: 'center',
  },

  // Dropdown (mapea valores a labels)
  {
    field: 'estado',
    header: 'Estado',
    type: ColumnType.DROPDOWN,
    dropdownOptions: [
      { label: 'Pendiente', value: 'PENDING' },
      { label: 'Aprobado', value: 'APPROVED' },
      { label: 'Rechazado', value: 'REJECTED' },
    ],
  },
];
```

### Propiedades de Columna

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `field` | `string` | Campo del objeto (soporta dot notation: `"user.name"`) |
| `header` | `string` | Texto del header |
| `type` | `ColumnType` | Tipo de dato (TEXT, NUMBER, CURRENCY, DATE, BOOLEAN, DROPDOWN) |
| `sortable` | `boolean` | Habilita ordenamiento (default: true) |
| `align` | `'left' \| 'center' \| 'right'` | Alineación del texto |
| `width` | `string` | Ancho de columna (ej: "150px") |
| `currencyDecimals` | `number` | Decimales para currency (default: 2) |
| `showCurrencySymbol` | `boolean` | Mostrar símbolo S/ (default: true) |
| `dateFormat` | `string` | Formato de fecha (date-fns format) |
| `dropdownOptions` | `DropdownOption[]` | Opciones para dropdown |
| `getLabel` | `(value: any) => string` | Función custom para label |

## Acciones de Fila

```tsx
const config: DataTableConfig<Producto> = {
  // ... columnas ...
  rowActions: [
    {
      icon: 'pi pi-pencil',
      label: 'Editar',
      tooltip: 'Editar producto',
      action: (row, index) => {
        console.log('Editar:', row);
        // Lógica de edición
      },
    },
    {
      icon: 'pi pi-trash',
      label: 'Eliminar',
      severity: 'destructive',
      action: (row, index) => {
        console.log('Eliminar:', row);
      },
      // Deshabilitar si no está activo
      disabled: (row) => !row.activo,
      // Solo mostrar si tienes permiso
      permission: (row) => canDelete(row),
    },
  ],
};
```

## Selección de Filas

```tsx
'use client';

import { useState } from 'react';

export default function ProductosPage() {
  const [selected, setSelected] = useState<Producto[]>([]);

  return (
    <>
      <DataTable
        config={{
          // ... config ...
          selection: true,
          dataKey: 'id',
        }}
        selectedRows={selected}
        onSelectionChange={setSelected}
      />

      {selected.length > 0 && (
        <div>Seleccionados: {selected.length}</div>
      )}
    </>
  );
}
```

## Exportación a Excel

### Exportación Automática

```tsx
const config: DataTableConfig = {
  // ... columnas ...
  showExportButton: true,
  exportButtonLabel: 'Descargar Excel',
};
```

### Exportación Personalizada

```tsx
import { exportToExcel } from '@/lib/data-table/export';

const config: DataTableConfig = {
  showExportButton: true,
  onExport: async (filteredData) => {
    await exportToExcel(filteredData, 'productos', {
      sheetName: 'Listado de Productos',
      columnWidths: [15, 30, 15, 10],
      cellFormatters: {
        precio: (value) => `S/ ${value.toFixed(2)}`,
        fechaCreacion: (value) => formatDate(value, 'dd/MM/yyyy'),
      },
    });
  },
};
```

## Paginación

```tsx
const config: DataTableConfig = {
  // ... columnas ...
  showPaginator: true,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 25, 50],
  showCurrentPageReport: true,
  currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords}',
};
```

## Búsqueda Global

```tsx
const config: DataTableConfig = {
  // ... columnas ...
  showGlobalSearch: true,
  globalSearchPlaceholder: 'Buscar productos...',
  // Campos en los que buscar (default: todos)
  globalFilterFields: ['nombre', 'codigo', 'categoria'],
};
```

## Eventos

```tsx
const config: DataTableConfig = {
  // Click en fila
  onRowClick: (row) => {
    console.log('Fila clickeada:', row);
    // Navegar a detalle
    router.push(`/productos/${row.id}`);
  },

  // Refrescar datos
  onRefresh: async () => {
    await refetch();
  },
};
```

## Formateo Avanzado

### Valores Anidados

```tsx
// Objeto: { user: { profile: { name: "Juan" } } }
{
  field: 'user.profile.name',
  header: 'Usuario',
  type: ColumnType.TEXT,
}
```

### Formato Custom

```tsx
{
  field: 'estado',
  header: 'Estado',
  type: ColumnType.DROPDOWN,
  getLabel: (value) => {
    return value === 'ACTIVE' ? '✅ Activo' : '❌ Inactivo';
  },
}
```

## Migrando desde Angular

### Cambios principales

| Angular | Next.js |
|---------|---------|
| `p-table` | `DataTable` (TanStack Table) |
| `p-column` | `columns` array |
| `[(selection)]` | `selectedRows` + `onSelectionChange` |
| `(onRowClick)` | `onRowClick` callback |
| `[globalFilterFields]` | `globalFilterFields` |
| `exportCSV()` | `exportToExcel()` |

### Ejemplo de migración

**Angular:**
```html
<p-table [value]="productos" [columns]="cols" selectionMode="multiple">
  <ng-template pTemplate="header" let-columns>
    <tr>
      <th *ngFor="let col of columns">{{col.header}}</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-rowData let-columns="columns">
    <tr>
      <td *ngFor="let col of columns">{{rowData[col.field]}}</td>
    </tr>
  </ng-template>
</p-table>
```

**Next.js:**
```tsx
<DataTable
  config={{
    columns: cols.map(c => ({
      field: c.field,
      header: c.header,
      type: ColumnType.TEXT,
    })),
    data: productos,
    selection: true,
  }}
/>
```

## Características Futuras

🔲 Filtros por columna (dropdown, date range)  
🔲 Lazy loading (paginación server-side)  
🔲 Columnas redimensionables  
🔲 Drag & drop de columnas  
🔲 Exportación CSV  
🔲 Templates de celda custom  
🔲 Row grouping  
🔲 Edición inline  
🔲 Responsive mejorado (mobile)  

## Troubleshooting

### El formateo de moneda no funciona

Verifica que el valor sea numérico:
```tsx
// Convertir string a número antes de pasar a data
const productos = rawData.map(p => ({
  ...p,
  precio: parseFloat(p.precio),
}));
```

### Las fechas no se formatean

Asegúrate de que sean Date o string ISO válido:
```tsx
// Formato válido: "2024-05-19" o Date object
fechaCreacion: new Date().toISOString().split('T')[0],
```

### La búsqueda global no encuentra resultados

Verifica `globalFilterFields`:
```tsx
globalFilterFields: ['nombre', 'codigo'], // Campos donde buscar
```

## Ejemplo Completo

Ver [app/(dashboard)/ejemplo-tabla/page.tsx](../../app/(dashboard)/ejemplo-tabla/page.tsx) para un ejemplo funcional completo.
