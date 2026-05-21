/**
 * Utilidades centralizadas del proyecto
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de Tailwind CSS de forma inteligente
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Re-exportar módulos de utilidades
export * from './dates';
export * from './strings';
