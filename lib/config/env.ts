/**
 * Configuración de variables de entorno
 * Tipado y acceso centralizado a variables de entorno
 */

export const env = {
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://desarrollo.nettalco.com.pe/plantillaWS/',
  authUrl: process.env.NEXT_PUBLIC_AUTH_URL || 'https://desarrollo.nettalco.com.pe',
  externalImagesUrl: process.env.NEXT_PUBLIC_EXTERNAL_IMAGES_URL || '/external-images',

  // Auth
  centralLoginUrl: process.env.NEXT_PUBLIC_CENTRAL_LOGIN_URL || 'https://desarrollo.nettalco.com.pe/login',
  useMockAuth: process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true',

  // Request
  requestTimeout: Number(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT) || 30000,
} as const;

export type Environment = typeof env;
