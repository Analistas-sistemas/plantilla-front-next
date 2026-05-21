import { redirect } from 'next/navigation';

/**
 * Página raíz - Redirige automáticamente a /inicio (Acceso Rápido)
 */
export default function RootPage() {
  redirect('/inicio');
}
