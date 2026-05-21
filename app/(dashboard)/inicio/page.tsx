import { PageWithPermissions } from '@/components/guards';
import AccesoRapido from './_components/acceso-rapido';

export default async function InicioPage() {
  return (
    <PageWithPermissions sectionCode="INICIO" subsectionCode="ACCESO">
      <AccesoRapido />
    </PageWithPermissions>
  );
}
