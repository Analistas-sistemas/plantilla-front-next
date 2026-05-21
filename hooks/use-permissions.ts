/**
 * Hook para gestión de permisos
 */

import { useMemo } from 'react';
import { useAuthStore } from '@/store';
import { checkPermission, type PermissionCheck } from '@/lib/permissions';

export function usePermissions() {
  const user = useAuthStore((state) => state.user);
  
  /**
   * Verifica si el usuario tiene un permiso específico
   */
  const hasPermission = useMemo(() => {
    return (check: PermissionCheck): boolean => {
      if (!user) return false;
      return checkPermission(check, user);
    };
  }, [user]);
  
  /**
   * Verifica si el usuario tiene TODOS los permisos especificados
   */
  const hasAllPermissions = useMemo(() => {
    return (checks: PermissionCheck[]): boolean => {
      if (!user) return false;
      return checks.every(check => checkPermission(check, user));
    };
  }, [user]);
  
  /**
   * Verifica si el usuario tiene AL MENOS UNO de los permisos especificados
   */
  const hasAnyPermission = useMemo(() => {
    return (checks: PermissionCheck[]): boolean => {
      if (!user) return false;
      return checks.some(check => checkPermission(check, user));
    };
  }, [user]);
  
  /**
   * Verifica si el usuario es administrador
   */
  const isAdmin = useMemo(() => {
    return user?.rol?.esAdmin ?? false;
  }, [user]);
  
  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    isAdmin,
  };
}
