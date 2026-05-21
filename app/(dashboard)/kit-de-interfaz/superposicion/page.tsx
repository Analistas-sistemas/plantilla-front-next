import { PageWithPermissions } from '@/components/guards';
import { SuperposicionPageContent } from './superposicion-content';

export default async function SuperposicionPage() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="OVERLAY">
      <SuperposicionPageContent />
    </PageWithPermissions>
  );
}
