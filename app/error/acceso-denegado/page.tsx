'use client';

import { AccessDenied } from '@/components/guards';

interface AccesoDenegadoPageProps {
  searchParams: {
    reason?: 'error' | 'no-module' | 'insufficient' | 'no-access';
  };
}

export default function AccesoDenegadoPage({ searchParams }: AccesoDenegadoPageProps) {
  return <AccessDenied reason={searchParams.reason} />;
}
