import { create } from "zustand";

interface LayoutStore {
	isSidebarOpen: boolean;
	openSidebar: () => void;
	closeSidebar: () => void;
	toggleSidebar: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
	closeSidebar: () => set({ isSidebarOpen: false }),
	isSidebarOpen: false,
	openSidebar: () => set({ isSidebarOpen: true }),
	toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
