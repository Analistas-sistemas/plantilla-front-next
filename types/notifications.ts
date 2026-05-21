/**
 * Tipos relacionados con notificaciones
 */

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type?: "info" | "warning" | "success" | "error"
}

export interface NotificationsResponse {
  notifications: Notification[]
  unreadCount: number
  total: number
}
