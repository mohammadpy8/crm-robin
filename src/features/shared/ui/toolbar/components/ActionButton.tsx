"use client";

import {
	Button,
	Checkbox,
	CheckboxGroup,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@heroui/react";
import { useState } from "react";
import type { ActionButton as ActionButtonType } from "@/features/shared/ui/toolbar/types/toolbar.types";
import { cn } from "@/lib/utils";

export const ActionButton: React.FC<ActionButtonType> = ({
	label,
	icon,
	onClick,
	variant = "ghost",
	disabled = false,
	className,
	hasPopover = false,
	popoverOptions = [],
	onPopoverConfirm,
}) => {
	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	const handleConfirm = () => {
		onPopoverConfirm?.(selectedValues);
		setSelectedValues([]);
	};

	const baseStyles = cn(
		"flex h-9 items-center gap-2 rounded-lg px-3",
		"text-sm font-medium",
		"transition-all duration-200",
		"focus:outline-none focus:ring-2",
		"disabled:cursor-not-allowed disabled:opacity-50",
		"whitespace-nowrap",
	);

	const variantStyles = {
		danger: cn("bg-danger text-white", "hover:bg-danger/90", "focus:ring-danger/50"),
		ghost: cn("bg-gray-100 text-gray-700", "hover:bg-gray-200", "focus:ring-gray-300"),
	};

	if (!hasPopover || popoverOptions.length === 0) {
		return (
			<button
				className={cn(baseStyles, variantStyles[variant], className)}
				disabled={disabled}
				onClick={onClick}
				type="button"
			>
				<span>{label}</span>
				{icon && <span className="flex items-center justify-center">{icon}</span>}
			</button>
		);
	}

	return (
		<Popover offset={10} placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<button
					className={cn(baseStyles, variantStyles[variant], className)}
					disabled={disabled}
					type="button"
				>
					<span>{label}</span>
					{icon && <span className="flex items-center justify-center">{icon}</span>}
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-45">
				<div className="w-full px-4 py-3" dir="ltr">
					<CheckboxGroup
						className="gap-3"
						onValueChange={setSelectedValues}
						value={selectedValues}
					>
						{popoverOptions.map((option, index) => (
							<Checkbox
								classNames={{
									base: "w-full max-w-full m-0",
									label: "text-small w-full text-right",
									wrapper: "after:bg-primary",
								}}
								key={index}
								value={option.value}
							>
								{option.label}
							</Checkbox>
						))}
					</CheckboxGroup>

					<Button
						className="mt-4 w-full bg-primary text-white"
						onClick={handleConfirm}
						size="md"
					>
						تایید
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};
