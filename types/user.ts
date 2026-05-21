/**
 * Tipos para usuario y perfil
 */

export interface Usuario {
  tcodipers: string;
  nombreCompleto: string;
  puesto?: string;
  area?: string;
  ultimoAcceso?: string;
  rol?: {
    nombre: string;
    esAdmin: boolean;
  };
}

// Alias para compatibilidad con servicios
export type User = Usuario;

export interface Sistema {
  nombre?: string;
  minutosTokenAcceso?: number;
}

export interface ContextoCompleto {
  usuario: Usuario;
  sistema?: Sistema;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
