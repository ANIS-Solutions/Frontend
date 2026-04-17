import { create } from "zustand";
import type { User } from "@/app/types/auth.types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (user: User, token: string) => void;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),

  setToken: (token) => set({ token }),

  setUser: (user) => set({ user }),

  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));