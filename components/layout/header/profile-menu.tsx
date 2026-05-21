'use client';

import { useState } from 'react';
import { User, Shield, Database, Clock, Calendar, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Usuario, ContextoCompleto } from '@/types/user';

interface ProfileMenuProps {
  usuario: Usuario | null;
  contextoCompleto?: ContextoCompleto | null;
  onLogout?: () => void;
}

export function ProfileMenu({ usuario, contextoCompleto, onLogout }: ProfileMenuProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const getAvatarLabel = () => {
    if (!usuario?.nombreCompleto) return '?';
    const names = usuario.nombreCompleto.split(' ');
    return names.length >= 2 
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full">
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarFallback>{getAvatarLabel()}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => setDrawerVisible(true)}>
            <User className="mr-2 h-4 w-4" />
            <span>Mi Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>
            <span className="text-destructive">Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Drawer de Perfil */}
      <Sheet open={drawerVisible} onOpenChange={setDrawerVisible}>
        <SheetContent className="w-[400px] overflow-y-auto">
          <SheetHeader>
            <div className="flex flex-col items-center gap-3 pb-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">
                  {getAvatarLabel()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <SheetTitle className="text-xl">
                  {contextoCompleto?.usuario?.nombreCompleto || 'Usuario'}
                </SheetTitle>
                <SheetDescription className="text-sm">
                  {contextoCompleto?.usuario?.tcodipers || 'N/A'}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Información Personal */}
            {(contextoCompleto?.usuario?.puesto || contextoCompleto?.usuario?.area) && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  <span>Información</span>
                </div>
                <div className="space-y-2 rounded-lg border p-3">
                  {contextoCompleto.usuario.puesto && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Puesto</span>
                      <span className="font-medium">{contextoCompleto.usuario.puesto}</span>
                    </div>
                  )}
                  {contextoCompleto.usuario.puesto && contextoCompleto.usuario.area && (
                    <Separator />
                  )}
                  {contextoCompleto.usuario.area && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Área</span>
                      <span className="font-medium">{contextoCompleto.usuario.area}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rol */}
            {contextoCompleto?.usuario?.rol && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Shield className="h-4 w-4" />
                  <span>Rol</span>
                  {contextoCompleto.usuario.rol.esAdmin && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                </div>
                <Badge 
                  variant={contextoCompleto.usuario.rol.esAdmin ? 'destructive' : 'secondary'}
                  className="rounded-full"
                >
                  {contextoCompleto.usuario.rol.nombre}
                </Badge>
              </div>
            )}

            {/* Sistema */}
            {contextoCompleto?.sistema && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Database className="h-4 w-4" />
                  <span>Sistema</span>
                </div>
                <div className="space-y-2 rounded-lg border p-3">
                  {contextoCompleto.sistema.nombre && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nombre</span>
                      <span className="font-medium">{contextoCompleto.sistema.nombre}</span>
                    </div>
                  )}
                  {contextoCompleto.sistema.nombre && contextoCompleto.sistema.minutosTokenAcceso && (
                    <Separator />
                  )}
                  {contextoCompleto.sistema.minutosTokenAcceso && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sesión</span>
                      <span className="font-medium">
                        {contextoCompleto.sistema.minutosTokenAcceso} min
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Último Acceso */}
            {contextoCompleto?.usuario?.ultimoAcceso && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  <span>Último Acceso</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(contextoCompleto.usuario.ultimoAcceso)}</span>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
