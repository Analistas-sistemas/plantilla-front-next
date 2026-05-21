/**
 * Servicio de Reportes
 * Maneja operaciones relacionadas con generación y gestión de reportes
 */

import { apiClient } from '@/lib/api/client';

export interface Reporte {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  estado: 'Completado' | 'Procesando' | 'Error';
  tipo: 'Excel' | 'PDF' | 'CSV';
  url?: string;
}

export interface ReporteDetalle extends Reporte {
  contenido?: any;
  metadata?: Record<string, any>;
}

export class ReportesService {
  /**
   * Obtiene la lista de reportes
   */
  static async getReportes(params?: {
    page?: number;
    limit?: number;
    tipo?: string;
    estado?: string;
  }): Promise<{ data: Reporte[]; total: number }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.tipo) queryParams.append('tipo', params.tipo);
    if (params?.estado) queryParams.append('estado', params.estado);

    const endpoint = `/api/v1/reportes${queryParams.toString() ? `?${queryParams}` : ''}`;
    return apiClient.get<{ data: Reporte[]; total: number }>(endpoint);
  }

  /**
   * Obtiene el detalle de un reporte por ID
   */
  static async getReporteById(id: string): Promise<ReporteDetalle> {
    return apiClient.get<ReporteDetalle>(`/api/v1/reportes/${id}`);
  }

  /**
   * Genera un nuevo reporte
   */
  static async generateReporte(data: {
    tipo: string;
    formato: 'Excel' | 'PDF' | 'CSV';
    parametros?: Record<string, any>;
  }): Promise<Reporte> {
    return apiClient.post<Reporte>('/api/v1/reportes', data);
  }

  /**
   * Descarga un reporte (retorna URL para descarga)
   */
  static getDownloadUrl(id: string): string {
    return `/api/v1/reportes/${id}/download`;
  }

  /**
   * Elimina un reporte
   */
  static async deleteReporte(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/reportes/${id}`);
  }
}

