import { redirectToError } from '@/lib/errors';

/**
 * Página legacy que redirige a la página de error unificada
 */
export default function UpsPage() {
  redirectToError('500');
}
