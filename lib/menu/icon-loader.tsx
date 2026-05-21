/**
 * Cargador dinámico de íconos de lucide-react
 */

import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type IconName = keyof typeof LucideIcons;

/**
 * Convierte un nombre de ícono en kebab-case a PascalCase
 * Ejemplo: 'home' -> 'Home', 'file-text' -> 'FileText'
 */
function iconNameToPascalCase(iconName: string): string {
  return iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Obtiene el componente de ícono de lucide-react por nombre
 */
export function getIconComponent(iconName: string): LucideIcon {
  // Convertir kebab-case a PascalCase
  const pascalName = iconNameToPascalCase(iconName);
  
  // Intentar con el nombre exacto
  let IconComponent = LucideIcons[pascalName as IconName] as LucideIcon;
  
  // Si no existe, intentar con sufijo "Icon"
  if (!IconComponent && !pascalName.endsWith('Icon')) {
    IconComponent = LucideIcons[`${pascalName}Icon` as IconName] as LucideIcon;
  }
  
  // Fallback al ícono Circle si no se encuentra
  return IconComponent || LucideIcons.Circle;
}

/**
 * Renderiza un ícono desde su nombre string
 */
export function renderIcon(iconName: string, props?: React.ComponentProps<LucideIcon>) {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent {...props} />;
}
