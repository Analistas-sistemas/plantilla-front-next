import { redirect } from 'next/navigation';
import { getPermissionsForSection } from '@/lib/permissions';

interface PermissionGuardProps {
  sectionId: number;
  subsectionId: number;
  moduloCodigo?: string;
  requireRead?: boolean;
  requireWrite?: boolean;
  requireUpdate?: boolean;
  requireDelete?: boolean;
  children: React.ReactNode;
}

/**
 * Componente de protección de permisos (Server Component)
 * Verifica que el usuario tenga los permisos necesarios antes de renderizar el contenido
 */
export async function PermissionGuard({
  sectionId,
  subsectionId,
  moduloCodigo,
  requireRead = true,
  requireWrite = false,
  requireUpdate = false,
  requireDelete = false,
  children,
}: PermissionGuardProps) {
  // Obtener permisos del servidor
  const permissionsState = await getPermissionsForSection(sectionId, subsectionId);

  // Si hay error cargando permisos, redirigir a página de error
  if (permissionsState.error) {
    redirect('/acceso-denegado?reason=error');
  }

  // Si se especifica un código de módulo, verificar permisos específicos
  if (moduloCodigo) {
    const moduloPermisos = permissionsState.modulosPermisos.find(
      (mp) => mp.modulo.codigo === moduloCodigo
    );

    if (!moduloPermisos) {
      redirect('/acceso-denegado?reason=no-module');
    }

    // Verificar permisos requeridos
    const hasRequiredPermissions =
      (!requireRead || moduloPermisos.canRead) &&
      (!requireWrite || moduloPermisos.canWrite) &&
      (!requireUpdate || moduloPermisos.canUpdate) &&
      (!requireDelete || moduloPermisos.canDelete);

    if (!hasRequiredPermissions) {
      redirect('/acceso-denegado?reason=insufficient');
    }
  } else {
    // Si no se especifica módulo, verificar que tenga al menos algún permiso
    const hasAnyPermission = permissionsState.modulosPermisos.length > 0;

    if (!hasAnyPermission) {
      redirect('/acceso-denegado?reason=no-access');
    }
  }

  // Usuario tiene permisos, renderizar contenido
  return <>{children}</>;
}
