"use client";

import { Header } from "@/features/shared/ui/header";
import { Sidebar } from "@/features/shared/ui/sidebar";
import { useLayoutStore } from "@/store/useLayoutStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { isSidebarOpen, openSidebar, closeSidebar } = useLayoutStore();

	return (
		<div className="min-h-screen">
			<Header onMenuClick={openSidebar} />
			<Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
			<main className="flex-1">{children}</main>
		</div>
	);
}
