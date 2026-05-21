/**
 * API Client
 * Cliente HTTP principal con manejo de errores, timeouts y loading
 * Migrado desde Angular's request-handler.service + auth.interceptor
 */

import { ApiClientConfig, ApiError, RequestOptions } from './types';
import { ApiErrorHandler } from './errors';
import { loadingStore } from '../loading/loading-store';

const DEFAULT_TIMEOUT = parseInt(
  process.env.NEXT_PUBLIC_REQUEST_TIMEOUT || '30000',
  10
);

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || BASE_URL;
    this.defaultTimeout = config.timeout || DEFAULT_TIMEOUT;
  }

  /**
   * Realiza una petición HTTP con manejo completo de errores y loading
   */
  private async fetchWithTimeout<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      showLoading = true,
      loadingMessage,
      skipErrorRedirect = false,
      ...fetchOptions
    } = options;

    const isFormData = fetchOptions.body instanceof FormData;

    // Configurar headers
    const headers = new Headers(fetchOptions.headers);
    headers.set('Accept', 'application/json');

    if (!isFormData && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    } else if (isFormData) {
      // Dejar que el browser configure Content-Type automáticamente para FormData
      headers.delete('Content-Type');
    }

    // Crear AbortController para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Mostrar loading si está habilitado
    if (showLoading) {
      loadingStore.show(loadingMessage);
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: 'include', // Equivalente a withCredentials: true
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Manejar errores HTTP
      if (!response.ok) {
        const error = ApiErrorHandler.createError(
          response.status,
          response.statusText,
          await this.extractErrorMessage(response),
          url
        );

        ApiErrorHandler.handleError(error, skipErrorRedirect);
        throw error;
      }

      // Parse JSON response
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }

      // Si no es JSON, devolver como texto
      return (await response.text()) as unknown as T;
    } catch (error: any) {
      clearTimeout(timeoutId);

      // Manejo de timeout
      if (error.name === 'AbortError') {
        const timeoutError = ApiErrorHandler.createError(
          0,
          'Request Timeout',
          'La petición excedió el tiempo límite',
          url,
          'timeout'
        );
        ApiErrorHandler.handleError(timeoutError, skipErrorRedirect);
        throw timeoutError;
      }

      // Manejo de error de red
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        const networkError = ApiErrorHandler.createError(
          0,
          'Network Error',
          'Error de conexión de red',
          url,
          'network'
        );
        ApiErrorHandler.handleError(networkError, skipErrorRedirect);
        throw networkError;
      }

      // Re-throw si ya es un ApiError
      if ('type' in error && 'status' in error) {
        throw error;
      }

      // Error desconocido
      throw ApiErrorHandler.createError(
        0,
        'Unknown Error',
        error.message || 'Error desconocido',
        url,
        'unknown'
      );
    } finally {
      if (showLoading) {
        loadingStore.hide();
      }
    }
  }

  /**
   * Extrae el mensaje de error de la respuesta
   */
  private async extractErrorMessage(response: Response): Promise<string> {
    try {
      const data = await response.json();
      return data.message || data.error || response.statusText;
    } catch {
      return response.statusText;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.fetchWithTimeout<T>(url, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    const body = data instanceof FormData ? data : JSON.stringify(data);

    return this.fetchWithTimeout<T>(url, {
      ...options,
      method: 'POST',
      body,
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    const body = data instanceof FormData ? data : JSON.stringify(data);

    return this.fetchWithTimeout<T>(url, {
      ...options,
      method: 'PUT',
      body,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    const body = data instanceof FormData ? data : JSON.stringify(data);

    return this.fetchWithTimeout<T>(url, {
      ...options,
      method: 'PATCH',
      body,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.fetchWithTimeout<T>(url, {
      ...options,
      method: 'DELETE',
    });
  }

  /**
   * Ejecuta múltiples requests en paralelo (equivalente a forkJoin)
   */
  async all<T>(
    requests: Promise<T>[],
    options?: { showLoading?: boolean; loadingMessage?: string }
  ): Promise<T[]> {
    const { showLoading = true, loadingMessage } = options || {};

    if (requests.length === 0) {
      return [];
    }

    if (showLoading) {
      loadingStore.show(loadingMessage);
    }

    try {
      return await Promise.all(requests);
    } finally {
      if (showLoading) {
        loadingStore.hide();
      }
    }
  }

  /**
   * Construye la URL completa
   */
  private buildUrl(endpoint: string): string {
    // Si el endpoint ya es una URL completa, usarla directamente
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }

    // Limpiar barras duplicadas
    const base = this.baseUrl.endsWith('/') ? this.baseUrl : `${this.baseUrl}/`;
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    return `${base}${path}`;
  }
}

// Instancia singleton
export const apiClient = new ApiClient();

// Exports para uso directo
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient.get<T>(endpoint, options),
  post: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiClient.post<T>(endpoint, data, options),
  put: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiClient.put<T>(endpoint, data, options),
  patch: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
    apiClient.patch<T>(endpoint, data, options),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient.delete<T>(endpoint, options),
  all: <T>(
    requests: Promise<T>[],
    options?: { showLoading?: boolean; loadingMessage?: string }
  ) => apiClient.all(requests, options),
};
