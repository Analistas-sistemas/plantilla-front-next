/**
 * Barrel de exportación de servicios
 * 
 * Los servicios encapsulan la lógica de negocio por dominio.
 * La capa lib/api/ maneja el transporte HTTP.
 */

export { AuthService } from './auth.service';
export { UserService } from './user.service';
export { ReportesService } from './reportes.service';
export type { Reporte, ReporteDetalle } from './reportes.service';

