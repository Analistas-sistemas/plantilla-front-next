"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

/**
 * Capitaliza y formatea un segmento de ruta
 * Ej: "kit-de-interfaz" → "Kit de Interfaz"
 */
function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()

  // Filtrar segmentos vacíos y grupos de rutas como (dashboard)
  const segments = pathname
    .split("/")
    .filter((segment) => segment && !segment.startsWith("("))

  // Si estamos en la raíz o solo hay un segmento, no mostrar breadcrumb
  if (segments.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Siempre mostrar "Inicio" como primer item */}
        <BreadcrumbItem>
          {segments.length === 1 && segments[0] === "inicio" ? (
            <BreadcrumbPage>Inicio</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/inicio">Inicio</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Renderizar el resto de segmentos */}
        {segments.map((segment, index) => {
          if (segment === "inicio") return null // Ya lo mostramos arriba

          const isLast = index === segments.length - 1
          const href = "/" + segments.slice(0, index + 1).join("/")
          const label = formatSegment(segment)

          return (
            <div key={segment} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
