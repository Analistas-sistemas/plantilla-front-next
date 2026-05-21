import { PermissionGuard } from './permission-guard';
import { getSectionAndSubsectionIds } from '@/lib/menu';

interface PageWithPermissionsProps {
  /** Código de la sección (ej: 'INICIO', 'UIKIT', 'PAGES') */
  sectionCode: string;
  /** Código de la subsección (ej: 'ACCESO', 'TOURS', 'CRUD') */
  subsectionCode: string;
  /** Código del módulo específico (opcional) */
  moduloCodigo?: string;
  /** Requiere permiso de lectura */
  requireRead?: boolean;
  /** Requiere permiso de escritura */
  requireWrite?: boolean;
  /** Requiere permiso de actualización */
  requireUpdate?: boolean;
  /** Requiere permiso de eliminación */
  requireDelete?: boolean;
  /** Contenido a proteger */
  children: React.ReactNode;
}

/**
 * Wrapper simplificado para proteger páginas con permisos usando códigos
 * Server Component que verifica permisos antes de renderizar
 * 
 * @example
 * ```tsx
 * export default async function MiPagina() {
 *   return (
 *     <PageWithPermissions
 *       sectionCode="UIKIT"
 *       subsectionCode="TOURS"
 *       requireRead={true}
 *     >
 *       <PageContainer title="Mi Página">
 *         // contenido protegido
 *       </PageContainer>
 *     </PageWithPermissions>
 *   );
 * }
 * ```
 */
export async function PageWithPermissions({
  sectionCode,
  subsectionCode,
  moduloCodigo,
  requireRead = true,
  requireWrite = false,
  requireUpdate = false,
  requireDelete = false,
  children,
}: PageWithPermissionsProps) {
  // Obtener IDs de sección y subsección
  const { sectionId, subsectionId } = await getSectionAndSubsectionIds(
    sectionCode,
    subsectionCode
  );

  return (
    <PermissionGuard
      sectionId={sectionId}
      subsectionId={subsectionId}
      moduloCodigo={moduloCodigo}
      requireRead={requireRead}
      requireWrite={requireWrite}
      requireUpdate={requireUpdate}
      requireDelete={requireDelete}
    >
      {children}
    </PermissionGuard>
  );
}
