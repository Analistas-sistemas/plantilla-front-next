import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getMenuItems, getSistemaNombre } from "@/lib/menu/menu-loader";
import { HeaderContent } from "@/components/header-content";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cargar datos del menú en el servidor (Server Component)
  const [menuItems, sistemaNombre] = await Promise.all([
    getMenuItems(),
    getSistemaNombre(),
  ]);

  return (
    <SidebarProvider>
      <AppSidebar menuItems={menuItems} sistemaNombre={sistemaNombre} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <HeaderContent />
        </header>
        <main className="flex flex-1 flex-col p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
