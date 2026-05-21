/**
 * Hook para gestión de permisos (client-side)
 * 
 * NOTA: Este hook solo proporciona información básica de autenticación.
 * Para verificaciones de permisos granulares (CRUD por módulo), usar las
 * funciones server-side de @/lib/permissions en Server Components.
 */

import { useMemo } from 'react';
import { useAuthStore } from '@/store';

export function usePermissions() {
  const user = useAuthStore((state) => state.user);
  
  /**
   * Verifica si el usuario está autenticado
   */
  const isAuthenticated = useMemo(() => {
    return !!user;
  }, [user]);
  
  /**
   * Verifica si el usuario es administrador
   */
  const isAdmin = useMemo(() => {
    return user?.rol?.esAdmin ?? false;
  }, [user]);
  
  /**
   * Obtiene el código del usuario
   */
  const userCode = useMemo(() => {
    return user?.tcodipers ?? null;
  }, [user]);
  
  /**
   * Obtiene el nombre del rol del usuario
   */
  const roleName = useMemo(() => {
    return user?.rol?.nombre ?? null;
  }, [user]);
  
  return {
    isAuthenticated,
    isAdmin,
    userCode,
    roleName,
  };
}
