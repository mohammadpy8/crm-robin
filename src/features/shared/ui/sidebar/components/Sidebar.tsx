"use client";

import { SidebarBackdrop } from "@/features/shared/ui/sidebar/components/SidebarBackdrop";
import { SidebarFooter } from "@/features/shared/ui/sidebar/components/SidebarFooter";
import { SidebarHeader } from "@/features/shared/ui/sidebar/components/SidebarHeader";
import { SidebarNavigation } from "@/features/shared/ui/sidebar/components/SidebarNavigation";
import {
	DEFAULT_USER_PROFILE,
	MENU_ITEMS,
} from "@/features/shared/ui/sidebar/constants/menuItems";
import { useSidebarMounted } from "@/features/shared/ui/sidebar/hooks/useSidebarMounted";
import type { SidebarProps } from "@/features/shared/ui/sidebar/types/sidebar.types";

export default function Sidebar({
	isOpen,
	onClose,
	userProfile = DEFAULT_USER_PROFILE,
}: SidebarProps) {
	const mounted = useSidebarMounted(isOpen);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<SidebarBackdrop isOpen={isOpen} onClick={onClose} />

			<aside
				className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<SidebarHeader onClose={onClose} userProfile={userProfile} />

				<div className="h-[calc(100%-7rem-4rem)] overflow-y-auto">
					<SidebarNavigation items={MENU_ITEMS} onClose={onClose} />
				</div>

				<SidebarFooter />
			</aside>
		</>
	);
}
