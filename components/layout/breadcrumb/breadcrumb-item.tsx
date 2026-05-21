import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItemProps {
  label: string;
  href?: string;
  isLast?: boolean;
}

export function BreadcrumbItem({ label, href, isLast }: BreadcrumbItemProps) {
  return (
    <li className="inline-flex items-center">
      {href && !isLast ? (
        <Link
          href={href}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {label}
        </Link>
      ) : (
        <span
          className={cn(
            'text-sm font-medium',
            isLast ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {label}
        </span>
      )}
      {!isLast && <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />}
    </li>
  );
}
