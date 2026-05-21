import { apiClient } from '@/lib/api/client';
import type { Usuario, ContextoCompleto } from '@/types/user';

/**
 * Respuesta de la API para datos de usuario
 */
interface UsuarioResponse {
  success: boolean;
  data: Usuario;
  message?: string;
}

interface ContextoResponse {
  success: boolean;
  data: ContextoCompleto;
  message?: string;
}

/**
 * Obtiene los datos del perfil del usuario desde la API
 * Server-only function
 */
export async function getPerfilUsuario(): Promise<Usuario | null> {
  try {
    const response = await apiClient.get<UsuarioResponse>('/api/v1/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo perfil de usuario:', error);
    return null;
  }
}

/**
 * Obtiene el contexto completo del usuario (perfil + sistema)
 * Server-only function
 */
export async function getContextoCompleto(): Promise<ContextoCompleto | null> {
  try {
    const response = await apiClient.get<ContextoResponse>('/api/v1/auth/me');
    return response.data;
  } catch (error) {
    // En desarrollo es normal no tener autenticación - usar mock silenciosamente
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    console.error('Error obteniendo contexto completo:', error);
    return null;
  }
}

/**
 * Mock de datos de usuario para desarrollo
 */
export function getMockUsuario(codigoPersona: string | null): Usuario {
  return {
    tcodipers: codigoPersona || 'MOCK123',
    nombreCompleto: 'Usuario de Desarrollo',
    puesto: 'Desarrollador Full Stack',
    area: 'Tecnología de la Información',
    ultimoAcceso: new Date().toISOString(),
    rol: {
      nombre: 'Desarrollador',
      esAdmin: false,
    },
  };
}

/**
 * Mock de contexto completo para desarrollo
 */
export function getMockContexto(codigoPersona: string | null): ContextoCompleto {
  return {
    usuario: getMockUsuario(codigoPersona),
    sistema: {
      nombre: 'Sistema de Plantilla',
      minutosTokenAcceso: 60,
    },
  };
}
