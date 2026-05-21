# API Client

Cliente HTTP para Next.js migrado desde Angular's `request-handler.service` y `auth.interceptor`.

## Características

- ✅ **Timeout configurable** (default: 30 segundos)
- ✅ **Loading automático** con store global
- ✅ **Manejo de errores HTTP** con redirección automática
- ✅ **Credenciales automáticas** (`credentials: 'include'`)
- ✅ **Soporte FormData** (auto-detección de Content-Type)
- ✅ **Requests paralelos** (equivalente a `forkJoin`)
- ✅ **Manejo especial de rutas de permisos** (403 solo en `/api/permisos/`)

## Uso Básico

```typescript
import { api } from '@/lib/api/client';

// GET request
const data = await api.get<User[]>('/api/usuarios');

// POST request
const newUser = await api.post<User>('/api/usuarios', {
  nombre: 'Juan',
  email: 'juan@example.com'
});

// PUT request
const updatedUser = await api.put<User>(`/api/usuarios/${id}`, userData);

// DELETE request
await api.delete(`/api/usuarios/${id}`);
```

## Opciones de Request

```typescript
// Deshabilitar loading
const data = await api.get<User[]>('/api/usuarios', {
  showLoading: false
});

// Mensaje de loading personalizado
const data = await api.get<User[]>('/api/usuarios', {
  loadingMessage: 'Cargando usuarios...'
});

// Timeout personalizado
const data = await api.get<User[]>('/api/usuarios', {
  timeout: 60000 // 60 segundos
});

// Evitar redirección automática en errores
const data = await api.get<User[]>('/api/usuarios', {
  skipErrorRedirect: true
});
```

## Requests Paralelos

```typescript
import { api } from '@/lib/api/client';

// Ejecutar múltiples requests en paralelo
const [users, products, orders] = await api.all([
  api.get<User[]>('/api/usuarios'),
  api.get<Product[]>('/api/productos'),
  api.get<Order[]>('/api/ordenes')
], {
  loadingMessage: 'Cargando datos...'
});
```

## FormData

```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('nombre', 'documento.pdf');

// Content-Type se configura automáticamente
const response = await api.post('/api/upload', formData);
```

## Manejo de Errores

El cliente maneja automáticamente los siguientes errores:

- **0 (Network)**: Error de conexión
- **401**: No autenticado
- **403**: Sin permisos (solo en rutas `/api/permisos/`)
- **404**: No encontrado
- **419**: CSRF token inválido
- **500**: Error interno del servidor
- **502**: Bad Gateway
- **503**: Servicio no disponible
- **504**: Gateway Timeout
- **Timeout**: Request excedió el tiempo límite

Todos estos errores redirigen automáticamente a `/error?type=<tipo>` a menos que uses `skipErrorRedirect: true`.

## Loading Global

```tsx
// app/layout.tsx
import { LoadingOverlay } from '@/components/shared/loading-overlay';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <LoadingOverlay />
      </body>
    </html>
  );
}
```

## Variables de Entorno

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://desarrollo.nettalco.com.pe/plantillaWS/
NEXT_PUBLIC_AUTH_URL=https://desarrollo.nettalco.com.pe
NEXT_PUBLIC_REQUEST_TIMEOUT=30000
```

## Migración desde Angular

### Antes (Angular)
```typescript
// En un servicio
constructor(private requestHandler: RequestHandlerService) {}

cargarUsuarios() {
  return this.requestHandler.handle(
    this.http.get<User[]>('/api/usuarios'),
    'Cargando usuarios...'
  );
}
```

### Después (Next.js)
```typescript
// En un Server Component
async function UsuariosPage() {
  const usuarios = await api.get<User[]>('/api/usuarios', {
    loadingMessage: 'Cargando usuarios...'
  });
  
  return <UsuariosTable data={usuarios} />;
}

// En un Client Component
'use client';
import { useEffect, useState } from 'react';

export function UsuariosClient() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  
  useEffect(() => {
    api.get<User[]>('/api/usuarios')
      .then(setUsuarios)
      .catch(console.error);
  }, []);
  
  return <UsuariosTable data={usuarios} />;
}
```
