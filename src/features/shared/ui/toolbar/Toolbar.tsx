"use client";

import { Menu } from "lucide-react";
import { type ReactNode, useState } from "react";
import { ArrowDown, Plus } from "@/icons";
import { cn } from "@/lib/utils";

export interface FilterOption {
	label: string;
	value: string;
}

export interface ActionButton {
	id: string;
	label: string;
	icon: ReactNode;
	variant: "ghost" | "danger";
	onClick: () => void;
	disabled?: boolean;
}

export interface ViewButton {
	id: string;
	label: string;
	icon: ReactNode;
	active?: boolean;
	onClick: () => void;
	disabled?: boolean;
}

export interface ToolbarConfig {
	// Top Section
	createButton: {
		label: string;
		icon?: ReactNode;
		onClick: () => void;
		disabled?: boolean;
	};
	filterButton: {
		defaultLabel: string;
		icon?: ReactNode;
		options: FilterOption[];
		onFilterChange?: (value: string) => void;
	};
	moreButton?: {
		label?: string;
		onClick: () => void;
		disabled?: boolean;
	};

	// Bottom Section
	pageTitle?: {
		title: string;
		icon?: ReactNode;
	};
	actionButtons?: ActionButton[];
	viewButtons?: ViewButton[];
}

export interface ButtonProps {
	label: string;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

export interface PageTitleProps {
	title: string;
	icon?: ReactNode;
}

interface ToolbarProps {
	config: ToolbarConfig;
}

const Toolbar: React.FC<ToolbarProps> = ({ config }) => {
	const [selectedFilter, setSelectedFilter] = useState(config.filterButton.defaultLabel);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isMoreOpen, setIsMoreOpen] = useState(false);

	const handleFilterChange = (option: string) => {
		setSelectedFilter(option);
		setIsFilterOpen(false);
		config.filterButton.onFilterChange?.(option);
	};

	return (
		<div className="w-full">
			{/* ================= Top Toolbar ================= */}
			<div className="mx-auto max-w-360 px-4 sm:px-6 md:px-10">
				<div className="w-full rounded-3xl bg-primary py-2">
					<div className="flex h-10 items-center justify-center gap-3">
						<div className="flex items-center gap-2">
							{/* More Button */}
							{config.moreButton && (
								<div className="relative">
									<TopButton
										disabled={config.moreButton.disabled}
										iconRight={<ArrowDown />}
										label={config.moreButton.label || "بیشتر"}
										onClick={() => setIsMoreOpen(!isMoreOpen)}
									/>
								</div>
							)}

							{/* Filter Dropdown */}
							<div className="relative">
								<TopButton
									iconLeft={config.filterButton.icon || <Menu className="h-4 w-4" />}
									iconRight={<ArrowDown />}
									label={selectedFilter}
									onClick={() => setIsFilterOpen(!isFilterOpen)}
								/>

								{isFilterOpen && (
									<>
										<div
											className="fixed inset-0 z-10"
											onClick={() => setIsFilterOpen(false)}
										/>
										<div className="absolute top-full left-0 z-20 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
											{config.filterButton.options.map((option) => (
												<button
													className="w-full px-4 py-2 text-right text-gray-700 text-sm transition-colors hover:bg-gray-100"
													key={option.value}
													onClick={() => handleFilterChange(option.label)}
													type="button"
												>
													{option.label}
												</button>
											))}
										</div>
									</>
								)}
							</div>

							{/* Create Button */}
							<TopButton
								disabled={config.createButton.disabled}
								iconLeft={config.createButton.icon || <Plus />}
								iconRight={<ArrowDown />}
								label={config.createButton.label}
								onClick={config.createButton.onClick}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* ================= Bottom Toolbar ================= */}
			<div className="w-full">
				<div className="mx-auto max-w-360 px-10">
					<div className="flex h-16 items-center justify-between">
						{/* Right Section: Title + Action Buttons */}
						<div className="flex items-center gap-6">
							{config.pageTitle && (
								<PageTitle icon={config.pageTitle.icon} title={config.pageTitle.title} />
							)}

							{config.actionButtons && config.actionButtons.length > 0 && (
								<div className="flex items-center gap-2">
									{config.actionButtons.map((button) => (
										<ActionButton
											disabled={button.disabled}
											icon={button.icon}
											key={button.id}
											label={button.label}
											onClick={button.onClick}
											variant={button.variant}
										/>
									))}
								</div>
							)}
						</div>

						{/* Left Section: View Switcher */}
						{config.viewButtons && config.viewButtons.length > 0 && (
							<div className="flex items-center gap-1 border-gray-200 pr-6">
								{config.viewButtons.map((button) => (
									<ViewButton
										active={button.active}
										disabled={button.disabled}
										icon={button.icon}
										key={button.id}
										label={button.label}
										onClick={button.onClick}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const PageTitle: React.FC<PageTitleProps> = ({ title, icon }) => {
	return (
		<div className="flex items-center gap-3">
			{icon && (
				<div className="flex h-7 w-7 items-center justify-center text-primary">
					{icon}
				</div>
			)}
			<h1 className="text-primary text-xl leading-none">{title}</h1>
		</div>
	);
};

const TopButton: React.FC<ButtonProps> = ({
	label,
	iconLeft,
	iconRight,
	onClick,
	disabled = false,
}) => {
	return (
		<button
			className={cn(
				"flex h-10 items-center gap-2 rounded-xl bg-white px-4",
				"font-medium text-secondary text-sm",
				"transition-all duration-200",
				"hover:bg-white/95 hover:shadow-sm",
				"focus:outline-none focus:ring-2 focus:ring-white/50",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"whitespace-nowrap",
			)}
			disabled={disabled}
			onClick={onClick}
			type="button"
		>
			{iconLeft && <span className="flex items-center justify-center">{iconLeft}</span>}
			<span>{label}</span>
			{iconRight && <span className="flex items-center justify-center">{iconRight}</span>}
		</button>
	);
};

interface ActionButtonProps {
	label: string;
	icon: React.ReactNode;
	onClick: () => void;
	variant: "ghost" | "danger";
	disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	label,
	icon,
	onClick,
	variant = "ghost",
	disabled = false,
}) => {
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

	return (
		<button
			className={cn(baseStyles, variantStyles[variant])}
			disabled={disabled}
			onClick={onClick}
			type="button"
		>
			<span>{label}</span>
			{icon && <span className="flex items-center justify-center">{icon}</span>}
		</button>
	);
};

interface ViewButtonProps {
	label: string;
	icon: React.ReactNode;
	onClick: () => void;
	active?: boolean;
	disabled?: boolean;
}

const ViewButton: React.FC<ViewButtonProps> = ({
	label,
	icon,
	onClick,
	active = false,
	disabled = false,
}) => {
	return (
		<button
			className={cn(
				"flex h-9 items-center gap-2 rounded-lg px-3",
				"font-medium text-sm",
				"transition-all duration-200",
				"focus:outline-none focus:ring-2 focus:ring-gray-300",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"whitespace-nowrap",
				active
					? "bg-gray-200 text-gray-900"
					: "bg-transparent text-gray-600 hover:bg-gray-100",
			)}
			disabled={disabled}
			onClick={onClick}
			type="button"
		>
			{icon && <span className="flex items-center justify-center">{icon}</span>}
			<span>{label}</span>
		</button>
	);
};

export default Toolbar;
