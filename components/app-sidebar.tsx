"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store"
import { renderIcon } from "@/lib/menu/icon-loader"
import type { MenuItem } from "@/lib/menu/types"
import { BuildingIcon, BellIcon } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotifications } from "@/hooks/use-notifications"
import Link from "next/link"

function SidebarBrand({ sistemaNombre }: { sistemaNombre: string }) {
  return (
    <SidebarMenuItem className="flex-1">
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <BuildingIcon className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{sistemaNombre}</span>
          <span className="truncate text-xs">Nettalco</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function NotificationsDropdown() {
  const { notifications, unreadCount } = useNotifications()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group-data-[collapsible=icon]:hidden relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          <BellIcon className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-semibold text-white shadow-md">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-0"
        align="start"
        side="right"
        sideOffset={8}
      >
        <div className="px-4 py-3">
          <h4 className="font-semibold text-sm">Notificaciones</h4>
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            No tienes notificaciones
          </div>
        ) : (
          <ScrollArea className="max-h-[400px]">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="px-4 py-3 cursor-pointer focus:bg-accent"
              >
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        )}
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notificaciones" className="w-full justify-center text-sm py-2">
                Ver todas
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * Transforma MenuItem[] del backend al formato esperado por NavMain
 */
function transformMenuItems(menuItems: MenuItem[]) {
  return menuItems.map((item) => ({
    title: item.label,
    url: item.href || "#",
    icon: item.icon ? renderIcon(item.icon) : undefined,
    isActive: false,
    items: item.items?.map((subItem) => ({
      title: subItem.label,
      url: subItem.href || "#",
    })),
  }))
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menuItems?: MenuItem[]
  sistemaNombre?: string
}

export function AppSidebar({ 
  menuItems = [], 
  sistemaNombre = "Sistema",
  ...props 
}: AppSidebarProps) {
  const user = useAuthStore((state) => state.user)
  const navMainItems = transformMenuItems(menuItems)

  const userData = user
    ? {
        name: user.nombreCompleto,
        email: user.puesto || user.area || "",
        avatar: "", // No avatar URL available
      }
    : {
        name: "Usuario",
        email: "",
        avatar: "",
      }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-center gap-2">
            <SidebarBrand sistemaNombre={sistemaNombre} />
            <NotificationsDropdown />
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
