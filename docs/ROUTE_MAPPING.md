# Sistema Dinámico de Mapeo de Rutas

## Descripción

El sistema convierte automáticamente las rutas del backend a rutas de Next.js usando **reglas de transformación** en lugar de un mapeo manual estático.

## Funcionamiento

### 1. Reglas de Sección (Prefijos)

Transforma el prefijo de la ruta:

```typescript
'/uikit/...' → '/kit-de-interfaz/...'
'/pages/...' → '/paginas/...'
'/reportes/...' → '/reportes/...'
'/inicio/...' → '/inicio/...'
```

### 2. Reglas de Slug (Nombres)

Transforma los nombres de las subsecciones:

```typescript
'formlayout' → 'diseno-formulario'
'input' → 'entrada'
'button' → 'boton'
'help' → 'ayuda'
'notfound' → 'no-encontrado'
// etc...
```

## Ejemplos de Transformación

```typescript
import { mapBackendRoute } from '@/lib/menu/route-mapping';

// UI Kit
mapBackendRoute('/uikit/formlayout')  // → '/kit-de-interfaz/diseno-formulario'
mapBackendRoute('/uikit/input')       // → '/kit-de-interfaz/entrada'
mapBackendRoute('/uikit/button')      // → '/kit-de-interfaz/boton'

// Páginas
mapBackendRoute('/pages/help')        // → '/paginas/ayuda'
mapBackendRoute('/pages/notfound')    // → '/paginas/no-encontrado'
mapBackendRoute('/pages/faq')         // → '/paginas/preguntas-frecuentes'

// Reportes (se mantienen igual)
mapBackendRoute('/reportes/lista')    // → '/reportes/lista'

// Inicio
mapBackendRoute('/inicio/inicio')     // → '/inicio/acceso-rapido'
```

## Agregar Nuevas Rutas (Extensibilidad)

Si el backend devuelve una **nueva sección** o **nueva subsección**, solo necesitas agregar la regla:

### Nueva Sección

```typescript
import { addSectionRule } from '@/lib/menu/route-mapping';

// Backend: '/admin/...' → Next.js: '/administracion/...'
addSectionRule('admin', 'administracion');
```

### Nueva Subsección

```typescript
import { addSlugRule } from '@/lib/menu/route-mapping';

// Backend: 'settings' → Next.js: 'configuracion'
addSlugRule('settings', 'configuracion');
```

## Ventajas del Sistema Dinámico

✅ **Sin mapeo manual**: No necesitas escribir cada ruta una por una  
✅ **Escalable**: Fácil agregar nuevas reglas sin modificar código existente  
✅ **Mantenible**: Las reglas están centralizadas en un solo lugar  
✅ **Automático**: El `menu-loader.ts` usa `mapBackendRoute` automáticamente  
✅ **Extensible**: Se pueden agregar reglas en runtime con `addSectionRule` y `addSlugRule`

## Integración con el Menú

El sistema se integra automáticamente en `lib/menu/menu-loader.ts`:

```typescript
// En createSubseccionMenuItem()
if (subseccion.ruta) {
  const mappedRoute = mapBackendRoute(subseccion.ruta); // ← Transformación automática
  menuItem.href = mappedRoute;
}
```

## Estructura del Backend (Referencia)

El backend devuelve rutas en formato:

```json
{
  "subsecciones": [
    {
      "codigo": "FORM_LAYOUT",
      "nombre": "Diseño de Formulario",
      "ruta": "/uikit/formlayout"  // ← Esta ruta se transforma automáticamente
    }
  ]
}
```

## Notas Importantes

- Las reglas se aplican **en orden**: primero sección, luego slug
- Si no hay regla para una parte de la ruta, se mantiene el valor original
- Las rutas se normalizan automáticamente (se agrega `/` al inicio si falta)
- El sistema es **case-sensitive**: `uikit` ≠ `UIKit`
