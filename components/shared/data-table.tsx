'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  Row,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, ChevronsUpDown, Download, MoreVertical, RefreshCw, Search, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { DataTableConfig, DataTableColumn, ColumnType } from '@/types/data-table';
import { formatCurrency, formatDate, formatNumber, getNestedValue, normalizeForSearch } from '@/lib/data-table/formatters';
import { exportToExcel } from '@/lib/data-table/export';

interface DataTableProps<TData> {
  config: DataTableConfig<TData>;
  selectedRows?: TData[];
  onSelectionChange?: (rows: TData[]) => void;
}

export function DataTable<TData extends Record<string, any>>({
  config,
  selectedRows = [],
  onSelectionChange,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // Construir columnas de TanStack Table desde la configuración
  const columns = useMemo<ColumnDef<TData>[]>(() => {
    const cols: ColumnDef<TData>[] = [];

    // Columna de selección
    if (config.selection) {
      cols.push({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Seleccionar todo"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Seleccionar fila"
            disabled={config.isRowSelectable && !config.isRowSelectable(row.original)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    // Columnas de datos
    config.columns.filter(col => !col.isAction).forEach((col) => {
      cols.push({
        accessorKey: col.field,
        header: ({ column }) => {
          if (col.sortable === false) {
            return <div className="text-center font-semibold">{col.header}</div>;
          }

          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="w-full"
            >
              {col.header}
              {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="ml-2 h-4 w-4" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const value = getNestedValue(row.original, col.field);
          return (
            <div className={cn('px-2', col.align === 'right' ? 'text-right' : col.align === 'left' ? 'text-left' : 'text-center')}>
              {formatCellValue(value, col)}
            </div>
          );
        },
        enableSorting: col.sortable !== false,
      });
    });

    // Columna de acciones
    if (config.rowActions && config.rowActions.length > 0) {
      cols.push({
        id: 'actions',
        header: () => <div className="text-center font-semibold">Acciones</div>,
        cell: ({ row }) => <RowActions row={row.original} index={row.index} actions={config.rowActions || []} />,
        enableSorting: false,
        enableHiding: false,
      });
    }

    return cols;
  }, [config]);

  const table = useReactTable({
    data: config.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      globalFilter,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: config.rowsPerPage || 10,
      },
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const searchValue = normalizeForSearch(filterValue);
      const fields = config.globalFilterFields || config.columns.map(c => c.field);
      
      return fields.some(field => {
        const value = getNestedValue(row.original, field);
        return normalizeForSearch(value).includes(searchValue);
      });
    },
  });

  const handleExport = async () => {
    if (config.onExport) {
      config.onExport(table.getFilteredRowModel().rows.map(r => r.original));
      return;
    }

    try {
      const dataToExport = table.getFilteredRowModel().rows.map(r => r.original);
      await exportToExcel(dataToExport, 'tabla_exportada');
      // Toast success aquí si tienes un sistema de notificaciones
    } catch (error) {
      console.error('Error exportando:', error);
      // Toast error aquí
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      {(config.showGlobalSearch !== false || config.showExportButton !== false || config.showRefreshButton) && (
        <div className="flex items-center justify-between gap-2">
          {config.showGlobalSearch !== false && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={config.globalSearchPlaceholder || 'Buscar...'}
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8"
                disabled={config.disableGlobalSearch}
              />
              {globalFilter && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setGlobalFilter('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            {config.showExportButton !== false && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={config.exportButtonDisabled}
              >
                <Download className="mr-2 h-4 w-4" />
                {config.exportButtonLabel || 'Exportar'}
              </Button>
            )}

            {config.showRefreshButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={config.onRefresh}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {config.loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(config.getRowClass?.(row.original))}
                  onClick={() => config.onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {config.emptyMessage || 'No se encontraron registros'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {config.showPaginator !== false && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            {config.showCurrentPageReport !== false && (
              <span>
                Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{' '}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{' '}
                de {table.getFilteredRowModel().rows.length} registros
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Formatea el valor de una celda según su tipo
 */
function formatCellValue(value: any, column: DataTableColumn): string {
  if (value == null) return '-';

  switch (column.type) {
    case 'currency':
      return formatCurrency(value, column.currencyDecimals, column.showCurrencySymbol);
    case 'number':
      return String(formatNumber(value, column.numberFormat, column.numberLocale));
    case 'date':
      return formatDate(value, column.dateFormat);
    case 'dropdown':
      if (column.getLabel) return column.getLabel(value);
      if (column.dropdownOptions) {
        const option = column.dropdownOptions.find(opt => opt.value === value);
        return option ? option.label : String(value);
      }
      return String(value);
    case 'boolean':
      return value ? 'Sí' : 'No';
    default:
      return String(value);
  }
}

/**
 * Componente de acciones por fila
 */
function RowActions<TData>({ row, index, actions }: { row: TData; index: number; actions: any[] }) {
  const visibleActions = actions.filter(action => {
    if (typeof action.permission === 'function') {
      return action.permission(row);
    }
    return action.permission !== false;
  });

  if (visibleActions.length === 0) return null;

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {visibleActions.map((action, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => action.action(row, index)}
              disabled={action.disabled?.(row)}
            >
              {action.label || action.tooltip || 'Acción'}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
