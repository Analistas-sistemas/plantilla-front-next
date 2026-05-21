/**
 * API Error Handling
 * Manejo centralizado de errores HTTP
 */

import { ApiError, ErrorType } from './types';

export class ApiErrorHandler {
  /**
   * Determina el tipo de error según el status HTTP
   */
  static getErrorType(status: number, url?: string): ErrorType {
    switch (status) {
      case 0:
        return 'network';
      case 401:
        return '401';
      case 403:
        // Lógica especial para requests de permisos
        if (url?.includes('/api/v1/permisos/')) {
          return '403';
        }
        return 'unknown';
      case 404:
        return '404';
      case 419:
        return '419';
      case 500:
        return '500';
      case 502:
        return '502';
      case 503:
        return '503';
      case 504:
        return '504';
      default:
        return 'unknown';
    }
  }

  /**
   * Crea un objeto ApiError estructurado
   */
  static createError(
    status: number,
    statusText: string,
    message: string,
    url?: string,
    type?: ErrorType
  ): ApiError {
    return {
      status,
      statusText,
      message,
      url,
      type: type || this.getErrorType(status, url),
    };
  }

  /**
   * Redirige a la página de error apropiada
   */
  static redirectToError(type: ErrorType): void {
    if (typeof window !== 'undefined') {
      window.location.href = `/error?type=${type}`;
    }
  }

  /**
   * Maneja un error HTTP y decide si redirigir
   */
  static handleError(error: ApiError, skipRedirect: boolean = false): void {
    const shouldRedirect = [
      'network',
      'timeout',
      '401',
      '403',
      '404',
      '419',
      '500',
      '502',
      '503',
      '504',
    ].includes(error.type);

    if (shouldRedirect && !skipRedirect) {
      this.redirectToError(error.type);
    }
  }
}
