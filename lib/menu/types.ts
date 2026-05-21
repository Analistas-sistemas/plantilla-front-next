/**
 * Tipos para el sistema de menú y navegación
 */

export interface MenuResponse {
  success: boolean;
  message?: string;
  data: MenuData[];
}

export interface MenuData {
  sistema_id: number;
  sistema_codigo: string;
  sistema_nombre: string;
  secciones: Seccion[];
}

export interface Seccion {
  id: number;
  codigo: string;
  nombre: string;
  orden: number;
  subsecciones: Subseccion[];
}

export interface Subseccion {
  id: number;
  codigo: string;
  nombre: string;
  orden: number;
  ruta?: string;
  parent_seccion_id?: number;
  sistema_id?: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  items?: MenuItem[];
  data?: MenuItemData;
}

export interface MenuItemData {
  seccion?: Seccion & {
    sistema_id: number;
    sistema_codigo: string;
    sistema_nombre: string;
  };
  subseccion?: Subseccion & {
    parent_seccion_id: number;
    sistema_id: number;
  };
  parentId?: number;
}
