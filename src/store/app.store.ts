import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create((set) => ({}));
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (credentials) => {
        // Mock authentication
        if (credentials.username && credentials.password) {
          set({ user: credentials.username, token: "fake-jwt-token" });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, token: null }),
    }),
    { name: "auth-storage" }
  )
);
