import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
 * Verifica si existe algún token de autenticación en las cookies
 */
function hasAuthToken(request: NextRequest): boolean {
  for (const cookieName of ACCESS_COOKIE_NAMES) {
    const cookie = request.cookies.get(cookieName);
    if (cookie?.value) {
      return true;
    }
  }
  return false;
}

/**
 * Proxy de autenticación (anteriormente middleware)
 * Protege las rutas del dashboard verificando la existencia de tokens en cookies
 */
export function proxy(request: NextRequest) {
  // En desarrollo (localhost), permitir acceso sin cookies
  const isDevelopment = request.nextUrl.hostname === 'localhost' || 
                        request.nextUrl.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    return NextResponse.next();
  }

  const isAuthenticated = hasAuthToken(request);

  // Si no está autenticado, redirigir al sistema centralizado SSO
  if (!isAuthenticated) {
    const ssoUrl = process.env.NEXT_PUBLIC_CENTRAL_LOGIN_URL || 'https://desarrollo.nettalco.com.pe/NesWS';
    
    // Guardar la URL original para redirección post-login
    const redirectUrl = new URL(ssoUrl);
    redirectUrl.searchParams.set('returnUrl', request.url);
    
    return NextResponse.redirect(redirectUrl);
  }

  // Usuario autenticado, permitir acceso
  return NextResponse.next();
}

/**
 * Configuración del matcher
 * Protege todas las rutas excepto:
 * - /api (rutas de API públicas si las hay)
 * - /_next (archivos estáticos de Next.js)
 * - /favicon.ico y otros archivos públicos
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
