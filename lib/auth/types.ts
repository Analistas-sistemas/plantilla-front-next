/**
 * Tipos para autenticación y tokens JWT
 */

export interface DecodedToken {
  tcodipers?: string | number;
  codipers?: string | number;
  codiPers?: string | number;
  codigoPersona?: string | number;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface UserSession {
  codigoPersona: string | null;
  decodedToken: DecodedToken | null;
  isAuthenticated: boolean;
}
