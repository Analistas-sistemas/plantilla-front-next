'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <Button 
      variant="outline" 
      size="lg" 
      className="flex-1 border-brand-primary/20 hover:bg-brand-primary/5"
      onClick={() => router.back()}
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Volver atrás
    </Button>
  );
}
