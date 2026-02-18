"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarNavigationProps } from "@/features/shared/ui/sidebar/types/sidebar.types";

export function SidebarNavigation({ items, onClose }: SidebarNavigationProps) {
	const pathname = usePathname();

	return (
		<nav>
			{items.map(({ href, icon: Icon, label }, index) => {
				const isActive = pathname === href || pathname.startsWith(href + "/");

				return (
					<Link
						className={`flex items-center gap-4 px-6 py-4 text-secondary transition-colors ${
							isActive
								? "bg-primary/50"
								: `hover:bg-primary/25 ${index % 2 === 0 ? "bg-white" : "bg-[#F5F2F2]"}`
						}`}
						href={href}
						key={label}
						onClick={onClose}
					>
						<Icon className="h-6 w-6 fill-secondary text-transparent" />
						<span className="font-medium text-base">{label}</span>
					</Link>
				);
			})}
		</nav>
	);
}
