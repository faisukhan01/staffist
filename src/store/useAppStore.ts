import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Page = 'landing' | 'signin' | 'signup' | 'dashboard' | 'compliance';

interface AppState {
  currentPage: Page;
  isAuthenticated: boolean;
  sidebarTab: 'dashboard' | 'shifts' | 'compliance';
  sidebarOpen: boolean;
  userName: string;
  userRole: string;
  userLocation: string;
  navigateTo: (page: Page) => void;
  setSidebarTab: (tab: 'dashboard' | 'shifts' | 'compliance') => void;
  setSidebarOpen: (open: boolean) => void;
  signIn: () => void;
  signOut: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentPage: 'landing',
      isAuthenticated: false,
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
      signIn: () => set({ isAuthenticated: true, currentPage: 'dashboard', sidebarOpen: false }),
      signOut: () => set({ isAuthenticated: false, currentPage: 'landing', sidebarTab: 'dashboard', sidebarOpen: false }),
    }),
    {
      name: 'staffist-app-state',
      partialize: (state) => ({
        currentPage: state.currentPage,
        isAuthenticated: state.isAuthenticated,
        sidebarTab: state.sidebarTab,
      }),
    }
  )
);
