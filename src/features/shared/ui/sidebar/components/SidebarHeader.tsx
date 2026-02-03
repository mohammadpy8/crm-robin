import { Search, X } from "lucide-react";
import Image from "next/image";
import type { SidebarHeaderProps } from "@/features/shared/ui/sidebar/types/sidebar.types";

export function SidebarHeader({ onClose, userProfile }: SidebarHeaderProps) {
	return (
		<div className="flex h-22 items-center justify-between bg-secondary px-6">
			{/* User Info */}
			<div className="flex items-center gap-3">
				<div className="h-14 w-14 overflow-hidden rounded-full">
					<Image
						alt={userProfile.name}
						className="h-full w-full object-cover"
						height={56}
						src={userProfile.avatar}
						width={56}
					/>
				</div>

				<div className="text-right">
					<h3 className="font-semibold text-sm text-white">{userProfile.name}</h3>
					<p className="text-gray-300 text-xs" dir="rtl">
						{userProfile.phone}
					</p>
				</div>
			</div>

			{/* Actions */}
			<div className="flex">
				<button
					aria-label="جستجو"
					className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-primary"
					type="button"
				>
					<Search className="h-6 w-6" />
				</button>

				<button
					aria-label="بستن منو"
					className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-primary"
					onClick={onClose}
					type="button"
				>
					<X className="h-6 w-6" />
				</button>
			</div>
		</div>
	);
}
