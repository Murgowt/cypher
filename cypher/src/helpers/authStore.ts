import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '../interfaces/User';

export interface State {
  authToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

export interface Actions {
  setAuthToken: (authToken: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      authToken: null,
      isAuthenticated: false,
      user: null,
      setAuthToken: (authToken: string | null) =>
        set(() => ({
          authToken,
          isAuthenticated: !!authToken,
        })),
      setUser: (user: User | null) => set(() => ({ user })),
      logout: () =>
        set(() => ({ authToken: null, user: null, isAuthenticated: false })),
    }),
    {
      name: 'AuthStore',
    }
  )
);
