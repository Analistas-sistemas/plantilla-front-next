import { getAccessToken } from './cookies';
import { decodeToken, getCodigoPersonaFromToken, isTokenExpired } from './jwt';
import type { UserSession } from './types';

/**
 * Obtiene la sesión del usuario actual desde las cookies
 * Solo funciona en Server Components, Server Actions o Route Handlers
 */
export async function getUserSession(): Promise<UserSession> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      codigoPersona: null,
      decodedToken: null,
      isAuthenticated: false,
    };
  }

  const decodedToken = decodeToken(accessToken);

  if (!decodedToken || isTokenExpired(decodedToken)) {
    return {
      codigoPersona: null,
      decodedToken: null,
      isAuthenticated: false,
    };
  }

  const codigoPersona = getCodigoPersonaFromToken(decodedToken);

  return {
    codigoPersona,
    decodedToken,
    isAuthenticated: true,
  };
}

/**
 * Verifica si el usuario está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getUserSession();
  return session.isAuthenticated;
}
