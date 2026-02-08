"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortIconProps {
	isSorted: "asc" | "desc" | false;
	onClick: () => void;
}

export const SortIcon = ({ isSorted, onClick }: SortIconProps) => {
	const renderIcon = () => {
		if (isSorted === "asc") {
			return <ArrowUp className="h-3.5 w-3.5 text-primary" />;
		}
		if (isSorted === "desc") {
			return <ArrowDown className="h-3.5 w-3.5 text-primary" />;
		}
		return <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />;
	};

	return (
		<button
			className="shrink-0 rounded p-0.5 transition-colors hover:bg-gray-100"
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			type="button"
		>
			{renderIcon()}
		</button>
	);
};
