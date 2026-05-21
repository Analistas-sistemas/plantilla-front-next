/**
 * Servicio de Autenticación
 * Maneja operaciones relacionadas con autenticación y sesión de usuario
 */

import { apiClient } from '@/lib/api/client';
import type { User } from '@/types/user';

export class AuthService {
  /**
   * Obtiene el perfil del usuario actual
   */
  static async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/api/v1/auth/me');
  }

  /**
   * Cierra la sesión del usuario
   */
  static async logout(): Promise<void> {
    await apiClient.post('/api/v1/auth/logout');
  }

  /**
   * Valida si la sesión actual está activa
   */
  static async validateSession(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Refresca el token de sesión
   */
  static async refreshToken(): Promise<void> {
    await apiClient.post('/api/v1/auth/refresh');
  }
}

