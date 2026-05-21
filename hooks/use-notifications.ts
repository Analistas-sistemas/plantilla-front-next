"use client"

import { useState, useEffect } from "react"
import type { Notification } from "@/types"

/**
 * Hook para obtener notificaciones y conteo de no leídas
 * TODO: Conectar con API real cuando esté disponible
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true)
        // TODO: Implementar llamada a API
        // const response = await fetch('/api/notificaciones')
        // const data = await response.json()
        // setNotifications(data.notifications)
        // setUnreadCount(data.unreadCount)
        
        // Mock data temporal
        const mockData: Notification[] = [
          {
            id: "1",
            title: "Nueva cotización",
            message: "Se ha creado una nueva cotización #12345",
            timestamp: "Hace 5 minutos",
            read: false,
            type: "info"
          },
          {
            id: "2",
            title: "Cotización aprobada",
            message: "La cotización #12344 ha sido aprobada",
            timestamp: "Hace 1 hora",
            read: false,
            type: "success"
          },
        ]
        
        setNotifications(mockData)
        setUnreadCount(mockData.filter(n => !n.read).length)
      } catch (error) {
        console.error("Error fetching notifications:", error)
        setNotifications([])
        setUnreadCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return { 
    notifications, 
    unreadCount, 
    isLoading
  }
}
