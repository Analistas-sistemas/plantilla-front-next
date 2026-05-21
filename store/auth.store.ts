/**
 * Store de autenticación (Zustand)
 */

import { create } from 'zustand';
import type { Usuario } from '@/types';

interface AuthState {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: Usuario | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    isLoading: false 
  }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false,
    isLoading: false 
  }),
}));
