import { PageWithPermissions } from '@/components/shared';
import { TablaPageContent } from './tabla-content';

export default async function TablaPage() {
  return (
    <PageWithPermissions sectionCode="UIKIT" subsectionCode="TABLE">
      <TablaPageContent />
    </PageWithPermissions>
  );
}
