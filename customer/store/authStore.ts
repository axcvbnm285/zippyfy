import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isHydrated: false,

  login: (user, token) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    set({ user: null, token: null });
  },

  hydrate: () => {
    const token = localStorage.getItem("accessToken");
    const raw = localStorage.getItem("authUser");
    const user = raw ? (JSON.parse(raw) as User) : null;
    set({ token, user, isHydrated: true });
  },
}));
