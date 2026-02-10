"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import type { CreateButtonOption } from "@/features/shared/ui/toolbar/types/toolbar.types";
import { cn } from "@/lib/utils";

interface CreateButtonProps {
	config: {
		label: string;
		icon: React.ReactNode;
		disabled?: boolean;
		dropdownOptions?: CreateButtonOption[];
	};
	onCreateClick?: () => void;
	onCreateDropdownClick?: (option: CreateButtonOption) => void;
}

export const CreateButton: React.FC<CreateButtonProps> = ({
	config,
	onCreateClick,
	onCreateDropdownClick,
}) => {
	const hasDropdown = config.dropdownOptions && config.dropdownOptions.length > 0;

	if (!hasDropdown) {
		return (
			<button
				className={cn(
					"flex h-10 items-center gap-2 rounded-xl bg-white px-4",
					"font-medium text-secondary text-sm",
					"transition-all duration-200",
					"hover:bg-white/95 hover:shadow-sm",
					"focus:outline-none",
					"disabled:cursor-not-allowed disabled:opacity-50",
					"whitespace-nowrap hover:bg-secondary hover:text-white",
				)}
				disabled={config.disabled}
				onClick={onCreateClick}
				type="button"
			>
				{config.icon && (
					<span className="flex items-center justify-center">{config.icon}</span>
				)}
				<span>{config.label}</span>
			</button>
		);
	}

	return (
		<div className="flex items-center gap-0">
			<button
				className={cn(
					"flex h-10 items-center gap-2 rounded-r-xl bg-white px-4",
					"font-medium text-secondary text-sm",
					"transition-all duration-200",
					"hover:bg-white/95 hover:shadow-sm",
					"focus:outline-none",
					"disabled:cursor-not-allowed disabled:opacity-50",
					"whitespace-nowrap",
					"border-gray-200 border-l hover:bg-secondary hover:text-white",
				)}
				disabled={config.disabled}
				onClick={onCreateClick}
				type="button"
			>
				{config.icon && (
					<span className="flex items-center justify-center">{config.icon}</span>
				)}
				<span>{config.label}</span>
			</button>

			<Popover offset={10} placement="bottom" showArrow={true}>
				<PopoverTrigger>
					<button
						className={cn(
							"flex h-10 items-center justify-center rounded-l-xl bg-white px-2",
							"font-medium text-secondary text-sm",
							"transition-all duration-200",
							"hover:bg-white/95 hover:shadow-sm",
							"focus:outline-none",
							"hover:bg-secondary hover:text-white disabled:cursor-not-allowed disabled:opacity-50",
						)}
						disabled={config.disabled}
						type="button"
					>
						<ChevronDown className="h-4 w-4" />
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-48">
					<div className="w-full py-1">
						{config.dropdownOptions?.map((option, index) => (
							<button
								className="w-full px-4 py-2 text-right text-gray-700 text-sm transition-colors hover:bg-gray-100"
								key={`${option.value}-${index}`}
								onClick={() => onCreateDropdownClick?.(option)}
								type="button"
							>
								{option.label}
							</button>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
