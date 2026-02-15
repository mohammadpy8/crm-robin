"use client";

import { CreateButton } from "@/features/shared/ui/toolbar/components/CreateButton";
import { FilterDropdown } from "@/features/shared/ui/toolbar/components/FilterDropdown";
import { MoreButton } from "@/features/shared/ui/toolbar/components/MoreButton";
import type { FilterOption, ToolbarConfig, ToolbarHandlers } from "@/features/shared/ui/toolbar/types/toolbar.types";

interface TopToolbarProps {
  config: ToolbarConfig;
  selectedFilter: FilterOption;
  onFilterChange: (option: FilterOption) => void;
  handlers?: ToolbarHandlers;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({ config, selectedFilter, onFilterChange, handlers = {} }) => {
  return (
    <div className='mx-auto max-w-480 px-4 sm:px-6 md:px-10'>
      <div className='w-full overflow-x-auto rounded-3xl bg-primary py-2'>
        <div className='flex h-10 min-w-max items-center justify-center gap-3 px-2'>
          <div className='flex items-center gap-2'>
            <CreateButton
              config={config.createButton}
              onCreateClick={handlers.onCreateClick}
              onCreateDropdownClick={handlers.onCreateDropdownClick}
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
                onClick={handlers.onMoreClick}
                onOptionClick={handlers.onMoreOptionClick}
                options={config.moreButton.options}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
