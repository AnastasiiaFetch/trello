import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

const useSidebarStore = create<SidebarState>()(
  devtools(
    persist(
      set => ({
        isOpen: true,
        toggleSidebar: () => set(state => ({ isOpen: !state.isOpen })),
        setSidebarOpen: isOpen => set(() => ({ isOpen })),
      }),
      {
        name: 'sidebar-store',
      }
    )
  )
);

export default useSidebarStore;
