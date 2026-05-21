/**
 * API Client Types
 * Tipos para el cliente HTTP y manejo de respuestas
 */

export interface ApiClientConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: HeadersInit;
  showLoading?: boolean;
  loadingMessage?: string;
}

export interface ApiError {
  status: number;
  statusText: string;
  message: string;
  url?: string;
  type: ErrorType;
}

export type ErrorType = 
  | 'network'
  | 'timeout'
  | '401'
  | '403'
  | '404'
  | '419'
  | '500'
  | '502'
  | '503'
  | '504'
  | 'unknown';

export interface RequestOptions extends RequestInit {
  timeout?: number;
  showLoading?: boolean;
  loadingMessage?: string;
  skipErrorRedirect?: boolean;
}
