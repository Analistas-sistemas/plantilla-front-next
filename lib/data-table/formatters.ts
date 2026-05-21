import { format, parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea un número como moneda
 */
export function formatCurrency(
  value: any,
  decimals: number = 2,
  showSymbol: boolean = true
): string {
  if (value == null || value === '') return '-';

  try {
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : Number(value);
    if (isNaN(numValue)) return '-';

    const formatted = new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(numValue);

    return showSymbol ? `S/ ${formatted}` : formatted;
  } catch {
    return '-';
  }
}

/**
 * Formatea un número con configuración personalizada
 */
export function formatNumber(
  value: any,
  numberFormat?: string,
  locale: string = 'es-ES'
): string | number {
  if (value == null) return '-';

  try {
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : Number(value);
    if (isNaN(numValue)) return value || '-';

    if (numberFormat) {
      const formatParts = numberFormat.split('.');
      let minDigits = 0;
      let maxDigits = 0;

      if (formatParts.length > 1) {
        const fractionPart = formatParts[1].split('-');
        minDigits = parseInt(fractionPart[0] || '0', 10);
        maxDigits = parseInt(fractionPart[1] || fractionPart[0] || '0', 10);
      }

      if (!Number.isFinite(minDigits) || minDigits < 0) minDigits = 0;
      if (!Number.isFinite(maxDigits) || maxDigits < 0) maxDigits = 0;
      if (maxDigits < minDigits) maxDigits = minDigits;

      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: maxDigits,
      }).format(numValue);
    }

    return numValue;
  } catch {
    return value || '-';
  }
}

/**
 * Formatea una fecha según el formato especificado
 */
export function formatDate(value: any, dateFormat: string = 'dd/MM/yyyy'): string {
  if (!value) return '-';

  try {
    let date: Date;

    if (typeof value === 'string') {
      // Intentar parsear diferentes formatos comunes
      date = new Date(value);
      
      // Si no es válido, intentar formato dd/MM/yyyy
      if (!isValid(date)) {
        const parsed = parse(value, 'dd/MM/yyyy', new Date());
        if (isValid(parsed)) {
          date = parsed;
        } else {
          return '-';
        }
      }
    } else if (value instanceof Date) {
      date = value;
    } else {
      date = new Date(value);
    }

    if (!isValid(date)) return '-';

    return format(date, dateFormat, { locale: es });
  } catch {
    return '-';
  }
}

/**
 * Obtiene el valor anidado de un objeto usando notación de punto
 */
export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

/**
 * Normaliza un valor para búsqueda (lowercase, sin acentos)
 */
export function normalizeForSearch(value: any): string {
  if (value == null) return '';
  
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
