"use client";

import { useState } from "react";
import { Header } from "@/features/shared/ui/header";
import { Sidebar } from "@/features/shared/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen">
			<Header onMenuClick={() => setIsSidebarOpen(true)} />
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
			<main className="flex-1">{children}</main>
		</div>
	);
}
