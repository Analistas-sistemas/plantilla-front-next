/**
 * Tipos relacionados con respuestas de API
 */

/**
 * Respuesta genérica de la API
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Error de API
 */
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
}

/**
 * Respuesta paginada
 */
export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Opciones de petición
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}
