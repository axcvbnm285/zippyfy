import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  token: null,

  login: (user, token) => {
    localStorage.setItem("accessToken", token);

    set({
      user,
      token,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");

    set({
      user: null,
      token: null,
    });
  },
}));