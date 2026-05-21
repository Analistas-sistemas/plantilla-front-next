import { redirect } from 'next/navigation';

/**
 * Página 404 para rutas del Dashboard
 * Redirige a la página de error unificada con código 404
 */
export default function DashboardNotFound() {
  redirect('/error?code=404');
}
