import { redirect } from 'next/navigation';

/**
 * Obtiene la URL de la página de error con el código especificado
 * 
 * @example
 * getErrorUrl('404') // Returns: '/error?code=404'
 */
export function getErrorUrl(code: string): string {
  return `/error?code=${code}`;
}

/**
 * Redirige a la página de error con el código especificado
 * Solo funciona en Server Components
 * 
 * @example
 * redirectToError('404')
 */
export function redirectToError(code: string): never {
  redirect(getErrorUrl(code));
}

// Helpers específicos para errores comunes
export const redirectTo404 = () => redirectToError('404');
export const redirectTo401 = () => redirectToError('401');
export const redirectTo403 = () => redirectToError('403');
export const redirectTo500 = () => redirectToError('500');
export const redirectTo503 = () => redirectToError('503');
