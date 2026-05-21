"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"

export function HeaderContent() {
  return (
    <div className="flex w-full items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <DynamicBreadcrumb />
    </div>
  )
}
