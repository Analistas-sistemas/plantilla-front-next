import { redirect } from 'next/navigation';

/**
 * Página 404 global de Next.js
 * Redirige a la página de error unificada
 */
export default function NotFoundPage() {
  redirect('/error?code=404');
}
