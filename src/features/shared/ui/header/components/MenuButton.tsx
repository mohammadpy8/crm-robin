import { Menu } from "lucide-react";
import type { MenuButtonProps } from "@/features/shared/ui/header/types/header.types";

export default function MenuButton({ onClick }: MenuButtonProps) {
	return (
		<button
			aria-label="منو"
			className="flex h-8.75 items-center justify-center gap-2 rounded-[10px] bg-gray-100 px-2 transition-colors duration-200 hover:bg-gray-200"
			onClick={onClick}
			type="button"
		>
			<Menu className="h-5 w-5 text-gray-700" />
			<span className="font-medium text-gray-700 text-sm">منو</span>
		</button>
	);
}
