"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function SidebarFooter() {
	const { logout, isLoading } = useAuth({
		onLogoutSuccess: () => {
			// todo : add toast
		},
	});

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="absolute right-0 bottom-0 left-0 border-secondary/10 border-t bg-white px-6 py-4">
			<button
				aria-label="خروج از حساب کاربری"
				className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 font-medium text-red-600 text-sm transition-all hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={isLoading}
				onClick={handleLogout}
				type="button"
			>
				<LogOut className="h-4 w-4" />
				<span>{isLoading ? "در حال خروج..." : "خروج از حساب"}</span>
			</button>

			<p className="mt-3 text-center text-secondary text-xs">
				Copyright © 2025 Studio Robin
			</p>
		</div>
	);
}
