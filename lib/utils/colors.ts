/**
 * Utilidades para trabajar con el sistema de colores
 */

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'export' | 'warning' | 'danger' | 'info';
export type ColorState = 'base' | 'hover' | 'active' | 'disabled';
export type ColorVersion = 'v1' | 'v2';

/**
 * Obtiene la clase de Tailwind para un color específico
 * @param variant - Variante del color (primary, secondary, etc.)
 * @param state - Estado del color (base, hover, active, disabled)
 * @param version - Versión de la paleta (v1 o v2)
 * @param type - Tipo de propiedad CSS (bg, text, border)
 */
export function getColorClass(
  variant: ColorVariant,
  state: ColorState = 'base',
  version: ColorVersion = 'v1',
  type: 'bg' | 'text' | 'border' = 'bg'
): string {
  const prefix = type === 'bg' ? 'bg-' : type === 'text' ? 'text-' : 'border-';
  
  if (version === 'v2') {
    const baseClass = `${prefix}v2-${variant}`;
    return state === 'base' ? baseClass : `${baseClass}-${state}`;
  }

  // Version 1
  if (variant === 'primary' || variant === 'secondary') {
    const baseClass = `${prefix}brand-${variant}`;
    return state === 'base' ? baseClass : `${baseClass}-${state}`;
  }

  const baseClass = `${prefix}${variant}`;
  return state === 'base' ? baseClass : `${baseClass}-${state}`;
}

/**
 * Obtiene la variable CSS para un color específico
 * @param variant - Variante del color
 * @param state - Estado del color
 * @param version - Versión de la paleta
 */
export function getColorVariable(
  variant: ColorVariant,
  state: ColorState = 'base',
  version: ColorVersion = 'v1'
): string {
  if (version === 'v2') {
    const baseVar = `--v2-${variant}`;
    return state === 'base' ? baseVar : `${baseVar}-${state}`;
  }

  // Version 1
  if (variant === 'primary' || variant === 'secondary') {
    const baseVar = `--color-${variant}`;
    return state === 'base' ? baseVar : `${baseVar}-${state}`;
  }

  const baseVar = `--color-${variant}`;
  return state === 'base' ? baseVar : `${baseVar}-${state}`;
}

/**
 * Genera clases de Tailwind con estados hover y active
 * @param variant - Variante del color
 * @param version - Versión de la paleta
 * @param type - Tipo de propiedad CSS
 */
export function getInteractiveColorClass(
  variant: ColorVariant,
  version: ColorVersion = 'v1',
  type: 'bg' | 'text' | 'border' = 'bg'
): string {
  const base = getColorClass(variant, 'base', version, type);
  const hover = getColorClass(variant, 'hover', version, type);
  const active = getColorClass(variant, 'active', version, type);

  return `${base} hover:${hover} active:${active} transition-colors duration-200`;
}

/**
 * Genera clases completas para un botón con estados
 * @param variant - Variante del color
 * @param version - Versión de la paleta
 * @param textLight - Usar texto claro (blanco)
 */
export function getButtonColorClasses(
  variant: ColorVariant,
  version: ColorVersion = 'v1',
  textLight: boolean = true
): string {
  const bgClasses = getInteractiveColorClass(variant, version, 'bg');
  const textClass = textLight ? 'text-white' : 'text-gray-900';
  const disabledClass = `disabled:${getColorClass(variant, 'disabled', version, 'bg')} disabled:cursor-not-allowed`;

  return `${bgClasses} ${textClass} ${disabledClass}`;
}

/**
 * Mapeo de variantes a severidades de PrimeNG/shadcn
 */
export const variantToSeverity: Record<ColorVariant, string> = {
  primary: 'default',
  secondary: 'secondary',
  success: 'success',
  export: 'info',
  warning: 'warning',
  danger: 'destructive',
  info: 'info',
};

/**
 * Obtiene el color de texto apropiado para un fondo dado
 * @param variant - Variante del color de fondo
 * @param version - Versión de la paleta
 */
export function getTextColorForBackground(
  variant: ColorVariant,
  version: ColorVersion = 'v1'
): 'light' | 'dark' {
  // Fondos claros que necesitan texto oscuro (solo en V2)
  if (version === 'v2' && (variant === 'primary')) {
    return 'dark';
  }

  // Por defecto, usar texto claro para colores saturados
  return 'light';
}

/**
 * Clases predefinidas para badges
 */
export const badgeVariants = {
  primary: 'bg-brand-primary text-white',
  secondary: 'bg-brand-secondary text-white',
  success: 'bg-success text-white',
  export: 'bg-export text-white',
  warning: 'bg-warning text-white',
  danger: 'bg-danger text-white',
  info: 'bg-info text-white',
} as const;

/**
 * Clases predefinidas para alerts
 */
export const alertVariants = {
  success: 'bg-success/10 border-success text-success-active',
  warning: 'bg-warning/10 border-warning text-warning-active',
  danger: 'bg-danger/10 border-danger text-danger-active',
  info: 'bg-info/10 border-info text-info-active',
} as const;
