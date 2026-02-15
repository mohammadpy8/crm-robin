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

export type ActionButtonVisibility = "always" | "single" | "multiple" | "any";

export interface ActionButton {
  id: string;
  label: string;
  icon: ReactNode;
  variant: "ghost" | "danger";
  disabled?: boolean;
  className?: string;
  hasPopover?: boolean;
  popoverOptions?: ActionButtonOption[];
  visibility?: ActionButtonVisibility;
  disableOnMultiple?: boolean;
  selectionMode?: "single" | "multiple";
  popoverMaxHeight?: number;
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
}

export interface ToolbarConfig {
  createButton: {
    label: string;
    icon: ReactNode;
    disabled?: boolean;
    dropdownOptions?: CreateButtonOption[];
  };
  filterButton: {
    defaultLabel: string;
    icon: ReactNode;
    options: FilterOption[];
  };
  moreButton?: {
    label?: string;
    icon?: ReactNode;
    options?: MoreOption[];
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

export interface ToolbarHandlers {
  onCreateClick?: () => void;
  onCreateDropdownClick?: (option: CreateButtonOption) => void;
  onFilterChange?: (value: string, label: string) => void;
  onMoreClick?: () => void;
  onMoreOptionClick?: (option: MoreOption) => void;
  onActionButtonClick?: (buttonId: string) => void;
  onActionButtonPopoverConfirm?: (buttonId: string, selectedValues: string[]) => void;
}

export interface ToolbarContextValue {
  selectedCount: number;
  setSelectedCount: (count: number) => void;
  selectedFilter: FilterOption;
  setSelectedFilter: (filter: FilterOption) => void;
}
