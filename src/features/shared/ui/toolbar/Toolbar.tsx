"use client";

import { BottomToolbar } from "./components/BottomToolbar";
import { TopToolbar } from "./components/TopToolbar";
import { useToolbarContext } from "./hooks/useToolbarContext";
import type {
	CreateButtonOption,
	FilterOption,
	MoreOption,
	ToolbarConfig,
} from "./types/toolbar.types";

interface ToolbarProps {
	config: ToolbarConfig;
}

export const Toolbar: React.FC<ToolbarProps> = ({ config }) => {
	const { selectedCount, selectedFilter, setSelectedFilter } = useToolbarContext();

	const handleFilterChange = (option: FilterOption) => {
		setSelectedFilter(option.label);
		config.filterButton.onFilterChange?.(option.value, option.label);
	};

	const handleMoreOptionClick = (option: MoreOption) => {
		option.onClick?.();
	};

	const handleCreateDropdownClick = (option: CreateButtonOption) => {
		option.onClick?.();
	};

	const hasSelection = selectedCount > 0;

	return (
		<div className="w-full">
			<TopToolbar
				config={config}
				onCreateDropdownClick={handleCreateDropdownClick}
				onFilterChange={handleFilterChange}
				onMoreOptionClick={handleMoreOptionClick}
				selectedFilter={selectedFilter}
			/>

			<BottomToolbar
				actionButtons={config.actionButtons}
				hasSelection={hasSelection}
				pageTitle={config.pageTitle}
				selectedCount={selectedCount}
				showSelectionCount={config.showSelectionCount}
				viewButtons={config.viewButtons}
			/>
		</div>
	);
};
