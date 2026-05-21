export interface ErrorMessage {
  code: string;
  title: string;
  message: string;
  description: string;
  severity: 'error' | 'warn' | 'info';
}

export const ERROR_MESSAGES: Record<string, ErrorMessage> = {
  "401": {
    code: "401",
    title: "No Autorizado",
    message: "Tu sesión ha expirado",
    description: "Por razones de seguridad, tu sesión ha caducado. Por favor, inicia sesión nuevamente para continuar.",
    severity: "warn"
  },
  "403": {
    code: "403",
    title: "Acceso Prohibido",
    message: "No tienes los permisos necesarios",
    description: "Tu cuenta no tiene autorización para acceder a este recurso. Si consideras que esto es un error, contacta al administrador del sistema.",
    severity: "error"
  },
  "419": {
    code: "419",
    title: "Sesión Vencida",
    message: "Necesitas volver a autenticarte",
    description: "Tu token de autenticación ha caducado por seguridad. Por favor, inicia sesión nuevamente.",
    severity: "warn"
  },
  "404": {
    code: "404",
    title: "No Encontrado",
    message: "Esta página no existe",
    description: "La URL que intentas acceder no se encuentra disponible o ha sido movida. Verifica la dirección e intenta nuevamente.",
    severity: "warn"
  },
  "500": {
    code: "500",
    title: "Error del Servidor",
    message: "Algo salió mal en nuestro sistema",
    description: "Ha ocurrido un error inesperado. Nuestro equipo técnico ha sido notificado y está trabajando para resolverlo lo antes posible.",
    severity: "error"
  },
  "502": {
    code: "502",
    title: "Puerta de Enlace",
    message: "El servidor no puede responder ahora",
    description: "Estamos experimentando problemas de comunicación temporales. Por favor, intenta nuevamente en unos momentos.",
    severity: "error"
  },
  "503": {
    code: "503",
    title: "Servicio No Disponible",
    message: "El sistema está temporalmente fuera de línea",
    description: "El servicio no está disponible debido a mantenimiento o sobrecarga del servidor. Por favor, intenta más tarde.",
    severity: "warn"
  },
  "504": {
    code: "504",
    title: "Tiempo Agotado",
    message: "El servidor tardó demasiado en responder",
    description: "La solicitud no pudo completarse en el tiempo esperado. Por favor, inténtalo nuevamente.",
    severity: "warn"
  },
  "maintenance": {
    code: "503",
    title: "En Mantenimiento",
    message: "Estamos mejorando el sistema para ti",
    description: "Estamos realizando tareas de mantenimiento programado. El servicio estará disponible nuevamente muy pronto.",
    severity: "info"
  },
  "network": {
    code: "NETWORK",
    title: "Sin Conexión",
    message: "No se puede conectar con el servidor",
    description: "Verifica que tu dispositivo tenga conexión a internet activa e inténtalo nuevamente.",
    severity: "error"
  },
  "0": {
    code: "0",
    title: "Error de Red",
    message: "No hay comunicación con el servidor",
    description: "No se pudo establecer conexión. Verifica tu conexión a internet y vuelve a intentarlo.",
    severity: "error"
  },
  "timeout": {
    code: "TIMEOUT",
    title: "Solicitud Expirada",
    message: "La operación tardó demasiado tiempo",
    description: "El servidor puede estar experimentando alta demanda. Por favor, inténtalo nuevamente en unos momentos.",
    severity: "warn"
  }
};
