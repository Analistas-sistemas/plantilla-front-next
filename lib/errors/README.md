# Error Pages - Sistema de Manejo de Errores

Este módulo proporciona un sistema centralizado para manejar y mostrar errores en la aplicación.

## Página de Error Única

La aplicación tiene una **página de error única** ubicada en `/error` que maneja todos los códigos de error HTTP y de aplicación.

## Uso Rápido

### Helpers Específicos (Recomendado)

```typescript
import { redirectTo404, redirectTo500, redirectTo403 } from '@/lib/errors';

// En un Server Component
export default async function MyPage() {
  const data = await fetchData();
  
  if (!data) {
    redirectTo404(); // Redirige a /error?code=404
  }
  
  return <div>{data}</div>;
}
```

### Helper Genérico

```typescript
import { redirectToError } from '@/lib/errors';

redirectToError('419'); // Sesión vencida
redirectToError('maintenance'); // En mantenimiento
```

### Desde Client Components

```typescript
'use client';

import { useRouter } from 'next/navigation';
import { getErrorUrl } from '@/lib/errors';

export function MyComponent() {
  const router = useRouter();
  
  const handleError = () => {
    router.push(getErrorUrl('500'));
  };
  
  return <button onClick={handleError}>Simular error</button>;
}
```

## Helpers Disponibles

| Helper | Código | Descripción |
|--------|--------|-------------|
| `redirectTo404()` | 404 | Página no encontrada |
| `redirectTo401()` | 401 | No autorizado |
| `redirectTo403()` | 403 | Acceso prohibido |
| `redirectTo500()` | 500 | Error del servidor |
| `redirectTo503()` | 503 | Servicio no disponible |
| `redirectToError(code)` | Custom | Cualquier código |

## Códigos de Error Disponibles

| Código | Título | Descripción |
|--------|--------|-------------|
| `401` | No Autorizado | Sesión expirada |
| `403` | Acceso Prohibido | Sin permisos |
| `404` | No Encontrado | Página no existe |
| `419` | Sesión Vencida | Token expirado |
| `500` | Error del Servidor | Error inesperado |
| `502` | Puerta de Enlace | Servidor no responde |
| `503` | Servicio No Disponible | Mantenimiento |
| `504` | Tiempo Agotado | Timeout |
| `network` | Sin Conexión | Error de red |
| `timeout` | Solicitud Expirada | Operación tardó mucho |
| `maintenance` | En Mantenimiento | Mantenimiento programado |
| `0` | Error de Red | Sin comunicación |

## Ver Documentación Completa

Para ejemplos completos y guías detalladas, consulta:
📄 **[docs/ERROR_HANDLING.md](../../docs/ERROR_HANDLING.md)**
