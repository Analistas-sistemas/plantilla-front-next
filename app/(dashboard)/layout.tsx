import { getMenuItems, getSistemaNombre } from '@/lib/menu';
import { getUserSession } from '@/lib/auth';
import { getContextoCompleto, getMockContexto } from '@/lib/user/profile';
import { Sidebar } from '@/components/layout/sidebar/sidebar';
import { BreadcrumbProvider } from '@/components/layout/breadcrumb/breadcrumb-provider';
import type { MenuItem } from '@/lib/menu/types';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Obtener sesión de usuario
  const userSession = await getUserSession();

  // Cargar datos con manejo de errores
  let menuItems: MenuItem[] = [];
  let sistemaNombre = 'Sistema';
  let contextoCompleto = getMockContexto(userSession.codigoPersona);

  try {
    // Intentar cargar menú y nombre del sistema
    [menuItems, sistemaNombre] = await Promise.all([
      getMenuItems().catch(() => []),
      getSistemaNombre().catch(() => 'Sistema'),
    ]);
  } catch (error) {
    console.error('Error cargando menú:', error);
  }

  try {
    // Intentar cargar contexto del usuario
    const ctx = await getContextoCompleto();
    if (ctx) {
      contextoCompleto = ctx;
    }
  } catch (error) {
    console.error('Error cargando contexto de usuario:', error);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        menuItems={menuItems} 
        title={sistemaNombre}
        version="v1.0.0"
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <BreadcrumbProvider 
          menuItems={menuItems}
          usuario={contextoCompleto.usuario}
          contextoCompleto={contextoCompleto}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
