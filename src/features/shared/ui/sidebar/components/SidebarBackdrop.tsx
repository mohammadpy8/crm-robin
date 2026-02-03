import type { SidebarBackdropProps } from "@/features/shared/ui/sidebar/types/sidebar.types";

export function SidebarBackdrop({ isOpen, onClick }: SidebarBackdropProps) {
	return (
		<div
			className={`fixed inset-0 z-40 bg-white/50 transition-opacity duration-300 ${
				isOpen ? "opacity-100" : "pointer-events-none opacity-0"
			}`}
			onClick={onClick}
			onKeyDown={(e) => e.key === "Escape" && onClick()}
		/>
	);
}
