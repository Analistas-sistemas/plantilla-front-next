import { cookies } from 'next/headers';
import type { AuthTokens } from './types';

/**
 * Nombres de cookies conocidos para access token
 */
const ACCESS_COOKIE_NAMES = [
  'accessToken',
  'SSO__accessToken',
  'SSO_accessToken',
  'access_token',
  'Authorization',
] as const;

/**
 * Nombres de cookies conocidos para refresh token
 */
const REFRESH_COOKIE_NAMES = [
  'refreshToken',
  'SSO__refreshToken',
  'SSO_refreshToken',
  'refresh_token',
] as const;

/**
 * Obtiene un token desde las cookies del servidor
 * Busca en múltiples nombres posibles y retorna el primero encontrado
 */
async function getTokenFromCookies(cookieNames: readonly string[]): Promise<string | null> {
  const cookieStore = await cookies();

  for (const name of cookieNames) {
    const cookie = cookieStore.get(name);
    if (cookie?.value) {
      return cookie.value;
    }
  }

  return null;
}

/**
 * Obtiene los tokens de autenticación desde las cookies del servidor
 * Solo funciona en Server Components, Server Actions o Route Handlers
 */
export async function getAuthTokensFromCookies(): Promise<AuthTokens> {
  return {
    accessToken: await getTokenFromCookies(ACCESS_COOKIE_NAMES),
    refreshToken: await getTokenFromCookies(REFRESH_COOKIE_NAMES),
  };
}

/**
 * Obtiene solo el access token desde las cookies
 */
export async function getAccessToken(): Promise<string | null> {
  return await getTokenFromCookies(ACCESS_COOKIE_NAMES);
}

/**
 * Obtiene solo el refresh token desde las cookies
 */
export async function getRefreshToken(): Promise<string | null> {
  return await getTokenFromCookies(REFRESH_COOKIE_NAMES);
}
