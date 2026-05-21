import { PageWithPermissions } from '@/components/shared';
import { SuperposicionPageContent } from './superposicion-content';

export default async function SuperposicionPage() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="OVERLAY">
      <SuperposicionPageContent />
    </PageWithPermissions>
  );
}
