/**
 * Auth module - Funciones de autenticación para Server Components
 * 
 * IMPORTANTE: Estas funciones solo funcionan en Server Components,
 * Server Actions o Route Handlers. No se pueden usar en Client Components.
 */

export { getAuthTokensFromCookies, getAccessToken, getRefreshToken } from './cookies';
export { decodeToken, getCodigoPersonaFromToken, isTokenExpired } from './jwt';
export { getUserSession, isAuthenticated } from './session';
export type { DecodedToken, AuthTokens, UserSession } from './types';
