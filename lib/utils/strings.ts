/**
 * Utilidades para manipulación de strings
 */

/**
 * Capitaliza la primera letra de un string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convierte un string a title case
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Trunca un string a una longitud específica
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
}

/**
 * Remueve acentos de un string
 */
export function removeAccents(str: string): string {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Genera un slug desde un string
 */
export function slugify(str: string): string {
  if (!str) return '';
  return removeAccents(str)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Formatea un número con separadores de miles
 */
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '-';
  return new Intl.NumberFormat('es-PE').format(num);
}

/**
 * Formatea un monto como moneda
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency: string = 'PEN'
): string {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency
  }).format(amount);
}
