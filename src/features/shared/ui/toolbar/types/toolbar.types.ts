import type { ReactNode } from "react";

export interface FilterOption {
	label: string;
	value: string;
}

export interface MoreOption {
	label: string;
	value: string;
	onClick?: () => void;
}

export interface ActionButtonOption {
	label: string;
	value: string;
}

export interface ActionButton {
	id: string;
	label: string;
	icon: ReactNode;
	variant: "ghost" | "danger";
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	hasPopover?: boolean;
	popoverOptions?: ActionButtonOption[];
	onPopoverConfirm?: (selectedValues: string[]) => void;
}

export interface ViewButton {
	id: string;
	label: string;
	icon: ReactNode;
	active?: boolean;
	href: string;
	disabled?: boolean;
}

export interface CreateButtonOption {
	label: string;
	value: string;
	onClick?: () => void;
}

export interface ToolbarConfig {
	createButton: {
		label: string;
		icon: ReactNode;
		onClick: () => void;
		disabled?: boolean;
		dropdownOptions?: CreateButtonOption[];
	};
	filterButton: {
		defaultLabel: string;
		icon: ReactNode;
		options: FilterOption[];
		onFilterChange?: (value: string, label: string) => void;
	};
	moreButton?: {
		label?: string;
		icon?: ReactNode;
		options?: MoreOption[];
		onClick?: () => void;
		disabled?: boolean;
	};

	pageTitle?: {
		title: string;
		icon?: ReactNode;
	};
	actionButtons?: ActionButton[];
	viewButtons?: ViewButton[];
	showSelectionCount?: boolean;
}

export interface ToolbarContextValue {
	selectedCount: number;
	setSelectedCount: (count: number) => void;
	selectedFilter: FilterOption;
	setSelectedFilter: (filter: FilterOption) => void;
}
