/**
 * Servicio de Usuario
 * Maneja operaciones relacionadas con datos de usuario
 */

import { apiClient } from '@/lib/api/client';
import type { User } from '@/types/user';

export class UserService {
  /**
   * Obtiene el perfil de usuario por ID
   */
  static async getUserById(userId: string): Promise<User> {
    return apiClient.get<User>(`/api/v1/users/${userId}`);
  }

  /**
   * Actualiza el perfil del usuario actual
   */
  static async updateProfile(data: Partial<User>): Promise<User> {
    return apiClient.put<User>('/api/v1/users/me', data);
  }

  /**
   * Obtiene lista de usuarios (admin)
   */
  static async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ data: User[]; total: number }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.search) queryParams.append('search', params.search);

    const endpoint = `/api/v1/users${queryParams.toString() ? `?${queryParams}` : ''}`;
    return apiClient.get<{ data: User[]; total: number }>(endpoint);
  }

  /**
   * Cambia la contraseña del usuario actual
   */
  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/api/v1/users/me/change-password', {
      currentPassword,
      newPassword,
    });
  }
}

