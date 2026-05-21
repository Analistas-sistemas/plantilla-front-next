'use client';

import { Table } from '@tanstack/react-table';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchable?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = 'Buscar...',
  searchable = true,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2 py-4">
      {searchable && (
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn('search')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('search')?.setFilterValue(event.target.value)
              }
              className="pl-8"
            />
          </div>
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Limpiar
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
