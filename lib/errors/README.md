# Sistema de Errores

Sistema centralizado de manejo de errores para el frontend.

## Archivos

### `error-messages.ts`
Mensajes de error localizados y categorizados:
- Errores de autenticación (401, 403)
- Errores de validación (400, 422)
- Errores de servidor (500, 503)
- Errores de red

### `redirect.ts`
Utilidades para redirección en caso de error:
- Redirección a acceso denegado
- Redirección a página de error
- Redirección con parámetros de error

## Uso

### Mensajes de Error

```typescript
import { getErrorMessage } from '@/lib/errors';

try {
  await apiClient.get('/api/resource');
} catch (error) {
  const message = getErrorMessage(error);
  toast.error(message);
}
```

### Redirecciones

```typescript
import { redirectToAccessDenied, redirectToError } from '@/lib/errors';

// Redireccionar a acceso denegado
redirectToAccessDenied('insufficient');

// Redireccionar a página de error
redirectToError('Error inesperado', 500);
```

## Códigos de Razón

Para acceso denegado:
- `error`: Error al verificar permisos
- `no-module`: Módulo no encontrado
- `insufficient`: Permisos insuficientes
- `no-access`: Sin acceso

## Mejores Prácticas

1. **Siempre captura errores específicos primero**
   ```typescript
   try {
     // ...
   } catch (error) {
     if (error instanceof UnauthorizedError) {
       redirectToAccessDenied('no-access');
     } else {
       toast.error(getErrorMessage(error));
     }
   }
   ```

2. **Usa mensajes localizados**
   - No hardcodees mensajes de error en componentes
   - Usa `getErrorMessage()` para consistencia

3. **Log errores importantes**
   ```typescript
   catch (error) {
     console.error('[ComponentName] Error:', error);
     toast.error(getErrorMessage(error));
   }
   ```
