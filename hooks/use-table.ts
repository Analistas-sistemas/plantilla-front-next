/**
 * Hook para gestión de tablas de datos
 */

import { useState, useMemo, useCallback } from 'react';
import { PAGINATION } from '@/lib/config/constants';

export interface UseTableOptions {
  initialPageSize?: number;
  initialPage?: number;
}

export function useTable<T>(
  data: T[],
  options: UseTableOptions = {}
) {
  const {
    initialPageSize = PAGINATION.defaultPageSize,
    initialPage = 1,
  } = options;
  
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Calcular datos paginados
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, page, pageSize]);
  
  // Calcular información de paginación
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(data.length / pageSize);
    
    return {
      page,
      pageSize,
      total: data.length,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };
  }, [data.length, page, pageSize]);
  
  // Handlers
  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, pagination.totalPages)));
  }, [pagination.totalPages]);
  
  const nextPage = useCallback(() => {
    if (pagination.hasNext) {
      setPage(p => p + 1);
    }
  }, [pagination.hasNext]);
  
  const previousPage = useCallback(() => {
    if (pagination.hasPrevious) {
      setPage(p => p - 1);
    }
  }, [pagination.hasPrevious]);
  
  const changePageSize = useCallback((newSize: number) => {
    setPageSize(newSize);
    setPage(1); // Reset a la primera página
  }, []);
  
  const search = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset a la primera página al buscar
  }, []);
  
  return {
    // Data
    data: paginatedData,
    allData: data,
    
    // Pagination
    pagination,
    
    // Search
    searchTerm,
    
    // Actions
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    search,
  };
}
