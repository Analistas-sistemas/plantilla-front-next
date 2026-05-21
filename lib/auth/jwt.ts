import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from './types';

/**
 * Decodifica un token JWT
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('[JWT] Error decoding token:', error);
    return null;
  }
}

/**
 * Valida que un valor no sea vacío, nulo o undefined
 * Soporta valores de tipo string y number (común en JWT tokens)
 */
function getNonEmptyValue(value: any): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'number' && !isNaN(value)) {
    return value.toString();
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim();
  }
  return null;
}

/**
 * Extrae el código de persona desde un token JWT decodificado
 * Busca en múltiples campos posibles: tcodipers, codipers, codiPers, codigoPersona
 */
export function getCodigoPersonaFromToken(decoded: DecodedToken | null): string | null {
  if (!decoded) {
    return null;
  }

  return (
    getNonEmptyValue(decoded.tcodipers) ||
    getNonEmptyValue(decoded.codipers) ||
    getNonEmptyValue(decoded.codiPers) ||
    getNonEmptyValue(decoded.codigoPersona) ||
    null
  );
}

/**
 * Verifica si un token JWT ha expirado
 */
export function isTokenExpired(decoded: DecodedToken | null): boolean {
  if (!decoded || !decoded.exp) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
}
