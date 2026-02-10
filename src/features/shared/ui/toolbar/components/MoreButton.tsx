"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import type { MoreOption } from "@/features/shared/ui/toolbar/types/toolbar.types";
import { cn } from "@/lib/utils";

interface MoreButtonProps {
	label: string;
	icon?: React.ReactNode;
	options?: MoreOption[];
	onClick?: () => void;
	onOptionClick?: (option: MoreOption) => void;
	disabled?: boolean;
}

export const MoreButton: React.FC<MoreButtonProps> = ({
	label,
	icon,
	options,
	onClick,
	onOptionClick,
	disabled = false,
}) => {
	if (!options || options.length === 0) {
		return (
			<button
				className={cn(
					"flex h-10 items-center gap-2 rounded-xl bg-white px-4",
					"font-medium text-secondary text-sm",
					"transition-all duration-200",
					"focus:outline-none",
					"disabled:cursor-not-allowed",
					"whitespace-nowrap hover:bg-secondary hover:text-white",
				)}
				disabled={disabled}
				onClick={onClick}
				type="button"
			>
				{icon && <span className="flex items-center justify-center">{icon}</span>}
				<span>{label}</span>
			</button>
		);
	}

	return (
		<Popover offset={10} placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<button
					className={cn(
						"flex h-10 items-center gap-2 rounded-xl bg-white px-4",
						"font-medium text-secondary text-sm",
						"transition-all duration-200",
						"focus:outline-none",
						"disabled:cursor-not-allowed",
						"whitespace-nowrap hover:bg-secondary hover:text-white",
					)}
					disabled={disabled}
					type="button"
				>
					{icon && <span className="flex items-center justify-center">{icon}</span>}
					<span>{label}</span>
					<span className="flex items-center justify-center">
						<ChevronDown className="h-4 w-4" />
					</span>
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-48">
				<div className="w-full py-1">
					{options.map((option, index) => (
						<button
							className="w-full px-4 py-2 text-right text-gray-700 text-sm transition-colors hover:bg-gray-100"
							key={`${option.value}-${index}`}
							onClick={() => onOptionClick?.(option)}
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
