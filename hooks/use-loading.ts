/**
 * useLoading Hook
 * Hook para consumir el estado de loading global
 */

'use client';

import { useEffect, useState } from 'react';
import { loadingStore } from '@/lib/loading/loading-store';

export function useLoading() {
  const [state, setState] = useState(() => loadingStore.getState());

  useEffect(() => {
    const unsubscribe = loadingStore.subscribe((isLoading, message) => {
      setState({ isLoading, message });
    });

    return unsubscribe;
  }, []);

  return state;
}
