"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import type { FilterOption } from "@/features/shared/ui/toolbar/types/toolbar.types";
import { cn } from "@/lib/utils";

interface FilterDropdownProps {
	selectedFilter: string;
	onFilterChange: (option: FilterOption) => void;
	options: FilterOption[];
	icon: React.ReactNode;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
	selectedFilter,
	onFilterChange,
	options,
	icon,
}) => {
	return (
		<Popover offset={10} placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<button
					className={cn(
						"flex h-10 items-center gap-2 rounded-xl bg-white px-4",
						"font-medium text-secondary text-sm",
						"transition-all duration-200",
						"hover:bg-white/95 hover:shadow-sm",
						"focus:outline-none",
						"whitespace-nowrap hover:bg-secondary hover:text-white",
					)}
					type="button"
				>
					{icon && <span className="flex items-center justify-center">{icon}</span>}
					<span>{selectedFilter}</span>
					<span className="flex items-center justify-center">
						<ChevronDown className="h-4 w-4" />
					</span>
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-48">
				<div className="w-full py-1">
					{options.map((option) => (
						<button
							className={cn(
								"w-full px-4 py-2 text-right text-sm transition-colors hover:bg-gray-100",
								selectedFilter === option.label
									? "bg-gray-50 font-medium text-gray-900"
									: "text-gray-700",
							)}
							key={option.value}
							onClick={() => onFilterChange(option)}
							type="button"
						>
							{option.label}
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};
