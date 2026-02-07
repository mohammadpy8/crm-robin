"use client";

import { cn } from "@/lib/utils";

interface ViewButtonProps {
	label: string;
	icon: React.ReactNode;
	href: string;
	active?: boolean;
	disabled?: boolean;
}

export const ViewButton: React.FC<ViewButtonProps> = ({
	label,
	icon,
	href,
	active = false,
	disabled = false,
}) => {
	const Component = active || disabled ? "div" : "a";

	const getStateClasses = () => {
		if (active) {
			return "bg-gray-200 text-gray-900";
		}
		if (disabled) {
			return "bg-transparent text-gray-400 opacity-50";
		}
		return "bg-transparent text-gray-600 hover:bg-gray-100";
	};

	const getCursorClasses = () => {
		if (active || disabled) {
			return "cursor-default";
		}
		return "cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300";
	};

	return (
		<Component
			className={cn(
				"flex h-9 items-center gap-2 rounded-lg px-3",
				"font-medium text-sm",
				"transition-all duration-200",
				"whitespace-nowrap",
				getCursorClasses(),
				getStateClasses(),
			)}
			{...(Component === "a" && { href })}
		>
			{icon && <span className="flex items-center justify-center">{icon}</span>}
			<span>{label}</span>
		</Component>
	);
};
