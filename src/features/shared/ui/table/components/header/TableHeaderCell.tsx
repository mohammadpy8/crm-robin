"use client";

import type { ColumnConfig, FilterValue } from "../../types";
import { DateRangeFilter, SelectFilter, TextFilter } from "../filters";
import { SortIcon } from "../shared";

interface TableHeaderCellProps {
  config: ColumnConfig;
  currentSort: "asc" | "desc" | false;
  filterValue: FilterValue;
  onApplyFilters: () => void;
  onFilterChange: (value: FilterValue) => void;
  onSort: () => void;
}

export const TableHeaderCell = ({
  config,
  currentSort,
  filterValue,
  onApplyFilters,
  onFilterChange,
  onSort,
}: TableHeaderCellProps) => {
  const renderFilter = () => {
    if (config.filterType === "text" && config.enableFiltering !== false) {
      return (
        <TextFilter
          onChange={(value) => onFilterChange(value)}
          onEnter={onApplyFilters}
          placeholder={config.header}
          value={(filterValue as string) || ""}
        />
      );
    }
    if (config.filterType === "select-single" && config.selectOptions) {
      return (
        <SelectFilter
          multiSelect={false}
          onChange={(value) => onFilterChange(value)}
          options={config.selectOptions}
          placeholder={config.header}
          value={(filterValue as string) || ""}
        />
      );
    }
    if (config.filterType === "select-multi" && config.selectOptions) {
      return (
        <SelectFilter
          multiSelect={true}
          onChange={(value) => onFilterChange(value)}
          options={config.selectOptions}
          placeholder={config.header}
          value={(filterValue as string[]) || []}
        />
      );
    }
    if (config.filterType === "date-range") {
      return (
        <DateRangeFilter
          onChange={(value) => onFilterChange(value)}
          placeholder={config.header}
          value={filterValue as never}
        />
      );
    }
    return <span className='whitespace-nowrap px-2 py-1 font-medium text-secondary text-xs'>{config.header}</span>;
  };

  return (
    <div className='flex h-full w-full items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 transition-colors hover:bg-gray-50'>
      <div className='min-w-0 flex-1'>{renderFilter()}</div>
      {config.enableSorting !== false && <SortIcon isSorted={currentSort} onClick={onSort} />}
    </div>
  );
};
