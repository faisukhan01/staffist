import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Page = 'landing' | 'signin' | 'signup' | 'dashboard' | 'compliance';
export type AuthRole = 'user' | 'admin' | null;

interface AppState {
  currentPage: Page;
  isAuthenticated: boolean;
  authRole: AuthRole;
  sidebarTab: 'dashboard' | 'shifts' | 'compliance';
  sidebarOpen: boolean;
  userName: string;
  userRole: string;
  userLocation: string;
  navigateTo: (page: Page) => void;
  setSidebarTab: (tab: 'dashboard' | 'shifts' | 'compliance') => void;
  setSidebarOpen: (open: boolean) => void;
  signIn: (role?: AuthRole) => void;
  signOut: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentPage: 'landing',
      isAuthenticated: false,
      authRole: null,
      sidebarTab: 'dashboard',
      sidebarOpen: false,
      userName: 'Sarah Johnson',
      userRole: 'Registered Nurse – ICU',
      userLocation: 'London, UK',
      navigateTo: (page) => set({ currentPage: page }),
      setSidebarTab: (tab) => {
        set({ sidebarTab: tab, sidebarOpen: false });
        if (tab === 'compliance') {
          set({ currentPage: 'compliance' });
        } else {
          set({ currentPage: 'dashboard' });
        }
      },
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      signIn: (role = 'user') => set({ isAuthenticated: true, authRole: role, currentPage: role === 'admin' ? 'landing' : 'dashboard', sidebarOpen: false }),
      signOut: () => set({ isAuthenticated: false, authRole: null, currentPage: 'landing', sidebarTab: 'dashboard', sidebarOpen: false }),
    }),
    {
      name: 'staffist-app-state',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        authRole: state.authRole,
        sidebarTab: state.sidebarTab,
      }),
    }
  )
);
