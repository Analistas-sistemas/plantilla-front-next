# Error Handling - Sistema de Manejo de Errores

## Página de Error Única

La aplicación utiliza una **página de error única** ubicada en `/error` que maneja todos los códigos de error HTTP y errores de aplicación.

## Rutas de Error

### Página Principal
- **`/error?code=404`** - Página de error única sin layout del dashboard

### Redirecciones Automáticas
- **`/paginas/no-encontrado`** → Redirige a `/error?code=404`

## Uso en el Código

### Opción 1: Helpers Específicos (Recomendado)

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

### Opción 2: Helper Genérico

```typescript
import { redirectToError } from '@/lib/errors';

redirectToError('419'); // Sesión vencida
redirectToError('502'); // Error de gateway
redirectToError('maintenance'); // En mantenimiento
```

### Opción 3: Desde Client Components

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
| `redirectTo401()` | 401 | No autorizado / Sesión expirada |
| `redirectTo403()` | 403 | Acceso prohibido |
| `redirectTo500()` | 500 | Error del servidor |
| `redirectTo503()` | 503 | Servicio no disponible |
| `redirectToError(code)` | Custom | Cualquier código de error |

## Códigos de Error Soportados

| Código | Título | Cuándo usar |
|--------|--------|-------------|
| `404` | No Encontrado | Recurso no existe |
| `401` | No Autorizado | Sesión expirada |
| `403` | Acceso Prohibido | Sin permisos |
| `419` | Sesión Vencida | Token expirado |
| `500` | Error del Servidor | Error inesperado del backend |
| `502` | Puerta de Enlace | Servidor backend no responde |
| `503` | Servicio No Disponible | Mantenimiento o sobrecarga |
| `504` | Tiempo Agotado | Request timeout |
| `network` | Sin Conexión | Error de red/conectividad |
| `timeout` | Solicitud Expirada | Operación tardó mucho |
| `maintenance` | En Mantenimiento | Mantenimiento programado |
| `0` | Error de Red | No hay comunicación |

## Ejemplos Completos

### Ejemplo 1: Validación de Datos

```typescript
import { redirectTo404, redirectTo500 } from '@/lib/errors';

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    
    if (!product) {
      redirectTo404(); // Producto no encontrado
    }
    
    return <ProductDetails product={product} />;
  } catch (error) {
    redirectTo500(); // Error del servidor
  }
}
```

### Ejemplo 2: Verificación de Autenticación

```typescript
import { redirectTo401 } from '@/lib/errors';
import { getSession } from '@/lib/auth';

export default async function ProtectedPage() {
  const session = await getSession();
  
  if (!session) {
    redirectTo401(); // Sesión expirada
  }
  
  return <ProtectedContent />;
}
```

### Ejemplo 3: Verificación de Permisos

```typescript
import { redirectTo403 } from '@/lib/errors';
import { hasPermission } from '@/lib/permissions';

export default async function AdminPage() {
  const canAccess = await hasPermission('ADMIN');
  
  if (!canAccess) {
    redirectTo403(); // Acceso prohibido
  }
  
  return <AdminPanel />;
}
```

### Ejemplo 4: Manejo de Errores de API

```typescript
import { redirectToError } from '@/lib/errors';

export default async function DataPage() {
  const response = await fetch('/api/data');
  
  if (!response.ok) {
    const status = response.status;
    redirectToError(status.toString()); // Redirige con el código HTTP real
  }
  
  const data = await response.json();
  return <DataDisplay data={data} />;
}
```

## Página de Demostración

Visita **`/paginas/ejemplos-errores`** para ver y probar todos los tipos de error disponibles en la aplicación.

## Notas Importantes

1. **Server Components Only**: `redirectToError()` y helpers solo funcionan en Server Components
2. **Client Components**: Usa `getErrorUrl()` con `useRouter().push()`
3. **Never Return Type**: Las funciones de redirect tienen tipo `never` porque Next.js lanza una excepción
4. **Pantalla Completa**: La página de error `/error` NO tiene el layout del dashboard (sidebar/header)
5. **URL Directa**: Puedes navegar directamente a `/error?code=XXX` para ver cualquier error

## Personalización

Para agregar nuevos códigos de error, edita:
- `lib/errors/error-messages.ts` - Agregar definición del mensaje
- `app/error/page.tsx` - Agregar icono correspondiente (opcional)
