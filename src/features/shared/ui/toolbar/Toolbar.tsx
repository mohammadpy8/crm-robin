"use client";

import { BottomToolbar } from "./components/BottomToolbar";
import { TopToolbar } from "./components/TopToolbar";
import { useToolbarContext } from "./hooks/useToolbarContext";
import type { FilterOption, ToolbarConfig, ToolbarHandlers } from "./types/toolbar.types";

interface ToolbarProps {
	config: ToolbarConfig;
	handlers?: ToolbarHandlers;
}

export const Toolbar: React.FC<ToolbarProps> = ({ config, handlers = {} }) => {
	const { selectedCount, selectedFilter, setSelectedFilter } = useToolbarContext();

	const handleFilterChange = (option: FilterOption) => {
		setSelectedFilter(option);
		handlers.onFilterChange?.(option.value, option.label);
	};

	const hasSelection = selectedCount > 0;

	return (
		<div className="w-full">
			<TopToolbar
				config={config}
				handlers={handlers}
				onFilterChange={handleFilterChange}
				selectedFilter={selectedFilter}
			/>

			<BottomToolbar
				actionButtons={config.actionButtons}
				handlers={handlers}
				hasSelection={hasSelection}
				pageTitle={config.pageTitle}
				selectedCount={selectedCount}
				showSelectionCount={config.showSelectionCount}
				viewButtons={config.viewButtons}
			/>
		</div>
	);
};
