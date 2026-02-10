"use client";

import { CreateButton } from "@/features/shared/ui/toolbar/components/CreateButton";
import { FilterDropdown } from "@/features/shared/ui/toolbar/components/FilterDropdown";
import { MoreButton } from "@/features/shared/ui/toolbar/components/MoreButton";
import type {
	CreateButtonOption,
	FilterOption,
	MoreOption,
	ToolbarConfig,
} from "@/features/shared/ui/toolbar/types/toolbar.types";

interface TopToolbarProps {
	config: ToolbarConfig;
	selectedFilter: FilterOption;
	onFilterChange: (option: FilterOption) => void;
	onMoreOptionClick: (option: MoreOption) => void;
	onCreateDropdownClick: (option: CreateButtonOption) => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({
	config,
	selectedFilter,
	onFilterChange,
	onMoreOptionClick,
	onCreateDropdownClick,
}) => {
	return (
		<div className="mx-auto max-w-360 px-4 sm:px-6 md:px-10">
			<div className="w-full rounded-3xl bg-primary py-2">
				<div className="flex h-10 items-center justify-center gap-3">
					<div className="flex items-center gap-2">
						<CreateButton
							config={config.createButton}
							onDropdownClick={onCreateDropdownClick}
						/>

						<FilterDropdown
							icon={config.filterButton.icon}
							onFilterChange={onFilterChange}
							options={config.filterButton.options}
							selectedFilter={selectedFilter}
						/>

						{config.moreButton && (
							<MoreButton
								disabled={config.moreButton.disabled}
								icon={config.moreButton.icon}
								label={config.moreButton.label || "بیشتر"}
								onClick={config.moreButton.onClick}
								onOptionClick={onMoreOptionClick}
								options={config.moreButton.options}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
