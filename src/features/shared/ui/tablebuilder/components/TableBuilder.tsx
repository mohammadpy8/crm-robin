/** biome-ignore-all lint/style/noNestedTernary: <explanation> */
"use client";

import {
	Checkbox,
	Pagination,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Spinner,
} from "@heroui/react";
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import { Edit, Eye } from "@/icons";

// ============================================================================
// Types & Interfaces
// ============================================================================

interface TableRow {
	date: string;
	email: string;
	id: number;
	name: string;
	phone: string;
	role: string;
	status?: string;
}

type FilterType = "date-range" | "select-multi" | "select-single" | "text";

interface BadgeConfig {
	[key: string]: {
		bgColor: string;
		label: string;
		textColor: string;
	};
}

interface ColumnConfig {
	accessorKey: string;
	badge?: BadgeConfig;
	cell?: (value: string | undefined) => React.ReactNode;
	enableFiltering?: boolean;
	enableSorting?: boolean;
	filterType?: FilterType;
	header: string;
	selectOptions?: string[];
	size?: number;
	sortableFieldName?: string;
}

type DateRange = [DateObject | null, DateObject | null] | null;
type FilterValue = DateRange | string[] | string;

interface TableBuilderProps {
	columns: ColumnConfig[];
	data: TableRow[];
	itemsPerPage?: number;
	loading?: boolean;
	multiSelect?: boolean;
	onFilterChange?: (filters: Record<string, FilterValue>) => void;
	onPageChange?: (page: number) => void;
	onRowEdit?: (row: TableRow) => void;
	onRowView?: (row: TableRow) => void;
	onSelectionChange?: (selectedIds: number[]) => void;
	onSortChange?: (sortField: string | null, sortOrder: "asc" | "desc" | null) => void;
	totalItems?: number;
	currentPage?: number;
}

interface SortIconProps {
	isSorted: "asc" | "desc" | false;
	onClick: () => void;
}

interface TextFilterProps {
	onChange: (value: string) => void;
	onEnter: () => void;
	placeholder: string;
	value: string;
}

interface SelectFilterProps {
	multiSelect?: boolean;
	onChange: (value: string[] | string) => void;
	options: string[];
	placeholder: string;
	value: string[] | string;
}

interface DateRangeFilterProps {
	onChange: (value: DateRange) => void;
	placeholder: string;
	value: DateRange;
}

interface TableHeaderCellProps {
	config: ColumnConfig;
	currentSort: "asc" | "desc" | false;
	filterValue: FilterValue;
	onApplyFilters: () => void;
	onFilterChange: (value: FilterValue) => void;
	onSort: () => void;
}

// ============================================================================
// Hooks
// ============================================================================

const useFilterState = () => {
	const filterInputsRef = useRef<Record<string, FilterValue>>({});
	const [, forceUpdate] = useState({});

	const setFilter = useCallback((columnId: string, value: FilterValue) => {
		filterInputsRef.current[columnId] = value;
		forceUpdate({});
	}, []);

	const getFilter = useCallback((columnId: string): FilterValue => {
		return filterInputsRef.current[columnId];
	}, []);

	const clearFilters = useCallback(() => {
		filterInputsRef.current = {};
		forceUpdate({});
	}, []);

	return { clearFilters, filters: filterInputsRef.current, getFilter, setFilter };
};

const useSyncScroll = (
	headerRef: React.RefObject<HTMLDivElement>,
	bodyRef: React.RefObject<HTMLDivElement>,
) => {
	useEffect(() => {
		const bodyScroll = bodyRef.current;
		const headerScroll = headerRef.current;

		if (!bodyScroll || !headerScroll) return;

		const handleBodyScroll = (): void => {
			headerScroll.scrollLeft = bodyScroll.scrollLeft;
		};

		bodyScroll.addEventListener("scroll", handleBodyScroll, { passive: true });

		return () => {
			bodyScroll.removeEventListener("scroll", handleBodyScroll);
		};
	}, [headerRef, bodyRef]);
};

// ============================================================================
// UI Components
// ============================================================================

const SortIcon = ({ isSorted, onClick }: SortIconProps) => {
	const renderIcon = () => {
		if (isSorted === "asc") {
			return <ArrowUp className="h-3.5 w-3.5 text-primary" />;
		}
		if (isSorted === "desc") {
			return <ArrowDown className="h-3.5 w-3.5 text-primary" />;
		}
		return <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />;
	};

	return (
		<button
			className="shrink-0 rounded p-0.5 transition-colors hover:bg-gray-100"
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			type="button"
		>
			{renderIcon()}
		</button>
	);
};

SortIcon.displayName = "SortIcon";

const TextFilter = ({ onChange, onEnter, placeholder, value }: TextFilterProps) => {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = e.target.value;
		setLocalValue(newValue);
		onChange(newValue);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			onEnter();
		}
	};

	return (
		<input
			className="w-full border-none bg-transparent px-2 py-1 font-medium text-secondary text-xs placeholder:font-medium placeholder:text-secondary focus:outline-none focus:ring-0"
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			placeholder={placeholder}
			type="text"
			value={localValue}
		/>
	);
};

TextFilter.displayName = "TextFilter";

const SelectFilter = ({
	multiSelect = false,
	onChange,
	options,
	placeholder,
	value,
}: SelectFilterProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSelect = useCallback(
		(option: string): void => {
			if (multiSelect) {
				const currentValues = Array.isArray(value) ? value : [];
				const newValues = currentValues.includes(option)
					? currentValues.filter((v) => v !== option)
					: [...currentValues, option];
				onChange(newValues);
			} else {
				onChange(option);
			}
		},
		[multiSelect, onChange, value],
	);

	const displayText = useMemo(() => {
		if (Array.isArray(value) && value.length > 0) {
			return value.join("، ");
		}
		if (!Array.isArray(value) && value) {
			return value;
		}
		return "";
	}, [value]);

	const filteredOptions = useMemo(() => {
		return options.filter((opt) => opt.toLowerCase().includes(searchTerm.toLowerCase()));
	}, [options, searchTerm]);

	return (
		<Popover offset={10} placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<div className="w-full cursor-pointer">
					<input
						className="w-full cursor-pointer border-none bg-transparent px-2 py-1 font-medium text-secondary text-xs placeholder:font-medium placeholder:text-secondary focus:outline-none focus:ring-0"
						placeholder={placeholder}
						readOnly={true}
						type="text"
						value={displayText}
					/>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<div className="flex flex-col">
					<div className="border-b p-2">
						<input
							className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="جستجو..."
							type="text"
							value={searchTerm}
						/>
					</div>

					{multiSelect && Array.isArray(value) && value.length > 0 && (
						<button
							className="border-b px-2 py-1.5 text-right text-red-600 text-xs hover:bg-gray-100"
							onClick={() => {
								onChange([]);
								setSearchTerm("");
							}}
							type="button"
						>
							پاک کردن همه
						</button>
					)}

					<div className="max-h-48 overflow-y-auto">
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option) => {
								const isSelected = multiSelect
									? Array.isArray(value) && value.includes(option)
									: value === option;
								return (
									<button
										className={`w-full px-2 py-1.5 text-right text-xs transition-colors hover:bg-gray-100 ${
											isSelected
												? "bg-primary/10 font-medium text-primary"
												: "text-gray-700"
										}`}
										key={option}
										onClick={() => handleSelect(option)}
										type="button"
									>
										{option}
									</button>
								);
							})
						) : (
							<div className="px-2 py-1.5 text-center text-gray-400 text-xs">
								نتیجه‌ای یافت نشد
							</div>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

SelectFilter.displayName = "SelectFilter";

const DateRangeFilter = ({ onChange, placeholder, value }: DateRangeFilterProps) => {
	const [localValue, setLocalValue] = useState<DateRange>(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const displayText = useMemo(() => {
		if (localValue?.[0] && localValue?.[1]) {
			return `${localValue[0].format("YYYY/MM/DD")} - ${localValue[1].format("YYYY/MM/DD")}`;
		}
		if (localValue?.[0]) {
			return localValue[0].format("YYYY/MM/DD");
		}
		return "";
	}, [localValue]);

	const handleClear = useCallback(
		(e: React.MouseEvent): void => {
			e.stopPropagation();
			setLocalValue(null);
			onChange(null);
		},
		[onChange],
	);

	const handleDateChange = useCallback(
		(dates: DateObject[] | DateObject | null): void => {
			if (Array.isArray(dates) && dates.length === 2) {
				const newRange: DateRange = [dates[0], dates[1]];
				setLocalValue(newRange);
				onChange(newRange);
			} else if (Array.isArray(dates) && dates.length === 1) {
				const newRange: DateRange = [dates[0], null];
				setLocalValue(newRange);
				onChange(newRange);
			} else if (dates === null) {
				setLocalValue(null);
				onChange(null);
			}
		},
		[onChange],
	);

	const datePickerValue = localValue
		? localValue.filter((d): d is DateObject => d !== null)
		: undefined;

	return (
		<Popover offset={10} placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<div className="flex w-full cursor-pointer items-center gap-1">
					<div className="min-w-0 flex-1 px-2 py-1">
						<span className="whitespace-nowrap font-medium text-secondary text-xs">
							{displayText || placeholder}
						</span>
					</div>
					{localValue?.[0] && (
						<button
							className="shrink-0 rounded p-0.5 transition-colors hover:bg-gray-100"
							onClick={handleClear}
							type="button"
						>
							<X className="h-3 w-3 text-gray-400" />
						</button>
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<DatePicker
					calendar={persian}
					locale={persian_fa}
					onChange={handleDateChange}
					range={true}
					value={datePickerValue}
				/>
			</PopoverContent>
		</Popover>
	);
};

DateRangeFilter.displayName = "DateRangeFilter";

const TableHeaderCell = ({
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
					value={(filterValue as DateRange) || null}
				/>
			);
		}
		return (
			<span className="whitespace-nowrap px-2 py-1 font-medium text-secondary text-xs">
				{config.header}
			</span>
		);
	};

	return (
		<div className="flex h-full w-full items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 transition-colors hover:bg-gray-50">
			<div className="min-w-0 flex-1">{renderFilter()}</div>
			{config.enableSorting !== false && (
				<SortIcon isSorted={currentSort} onClick={onSort} />
			)}
		</div>
	);
};

TableHeaderCell.displayName = "TableHeaderCell";

// ============================================================================
// Cell Renderers
// ============================================================================

const renderEmailCell = (value: string | undefined) => {
	if (!value) {
		return (
			<div className="pr-2 text-right">
				<span className="text-gray-400 text-xs">-</span>
			</div>
		);
	}
	return (
		<div className="pr-2 text-right">
			<a
				className="block truncate font-medium text-blue-400 text-xs hover:underline"
				href={`mailto:${value}`}
			>
				{value}
			</a>
		</div>
	);
};

const renderPhoneCell = (value: string | undefined) => {
	return (
		<div className="pr-2 text-right">
			<a
				className="font-medium text-blue-400 text-xs hover:underline"
				href={`tel:${value}`}
			>
				{value}
			</a>
		</div>
	);
};

const renderDefaultCell = (value: string | undefined) => {
	return (
		<div className="pr-2 text-right">
			<span className="font-medium text-gray-700 text-xs">{value}</span>
		</div>
	);
};

const renderBadgeCell = (value: string | undefined, badgeConfig?: BadgeConfig) => {
	if (!badgeConfig) {
		return (
			<div className="pr-2 text-right">
				<span className="font-medium text-gray-700 text-xs">{value || "-"}</span>
			</div>
		);
	}

	if (!value) {
		return (
			<div className="pr-2 text-right">
				<span className="font-medium text-gray-700 text-xs">-</span>
			</div>
		);
	}

	const config = badgeConfig[value];
	if (!config) {
		return (
			<div className="pr-2 text-right">
				<span className="font-medium text-gray-700 text-xs">{value}</span>
			</div>
		);
	}

	return (
		<div className="pr-2 text-right">
			<span
				className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-medium text-xs"
				style={{
					backgroundColor: config.bgColor,
					borderColor: `${config.textColor}40`,
					color: config.textColor,
				}}
			>
				{config.label}
			</span>
		</div>
	);
};

// ============================================================================
// Main Table Component
// ============================================================================

const TableBuilder = ({
	columns: columnConfigs,
	data,
	itemsPerPage = 8,
	loading = false,
	multiSelect = true,
	onFilterChange,
	onPageChange,
	onRowEdit,
	onRowView,
	onSelectionChange,
	onSortChange,
	totalItems,
	currentPage: externalCurrentPage,
}: TableBuilderProps) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
	const [internalCurrentPage, setInternalCurrentPage] = useState(1);

	const { setFilter, getFilter, filters } = useFilterState();
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const headerScrollRef = useRef<HTMLDivElement>(null);

	useSyncScroll(headerScrollRef, scrollContainerRef);

	const currentPage = externalCurrentPage ?? internalCurrentPage;

	const handleSort = useCallback(
		(columnId: string, currentSort: "asc" | "desc" | false): void => {
			let newSorting: SortingState = [];

			if (!currentSort) {
				newSorting = [{ desc: false, id: columnId }];
			} else if (currentSort === "asc") {
				newSorting = [{ desc: true, id: columnId }];
			} else {
				newSorting = [];
			}

			setSorting(newSorting);

			if (onSortChange) {
				const sortField = newSorting.length > 0 ? newSorting[0].id : null;
				const sortOrderValue = newSorting.length > 0 ? newSorting[0].desc : null;
				const sortOrder: "asc" | "desc" | null =
					sortOrderValue !== null ? (sortOrderValue ? "desc" : "asc") : null;
				onSortChange(sortField, sortOrder);
			}
		},
		[onSortChange],
	);

	const applyFilters = useCallback((): void => {
		const newFilters: ColumnFiltersState = Object.entries(filters)
			.filter(([, value]) => {
				if (Array.isArray(value)) {
					return value.length > 0;
				}
				if (value && typeof value === "object" && "format" in value) {
					return true;
				}
				return value !== "";
			})
			.map(([id, value]) => ({ id, value }));

		setColumnFilters(newFilters);

		if (onPageChange) {
			onPageChange(1);
		} else {
			setInternalCurrentPage(1);
		}

		if (onFilterChange) {
			const filterObj: Record<string, FilterValue> = {};
			for (const f of newFilters) {
				filterObj[f.id] = f.value as FilterValue;
			}
			onFilterChange(filterObj);
		}
	}, [filters, onFilterChange, onPageChange]);

	const renderCellContent = useCallback(
		(config: ColumnConfig, value: string | undefined) => {
			if (config.cell) {
				return <div className="pr-2 text-right">{config.cell(value)}</div>;
			}

			if (config.badge) {
				return renderBadgeCell(value, config.badge);
			}

			if (config.accessorKey === "email") {
				return renderEmailCell(value);
			}

			if (config.accessorKey === "phone") {
				return renderPhoneCell(value);
			}

			return renderDefaultCell(value);
		},
		[],
	);

	const handleRowSelection = useCallback(
		(index: number, checked: boolean) => {
			if (multiSelect) {
				setRowSelection((prev) => ({
					...prev,
					[index]: checked,
				}));
			} else {
				setRowSelection({ [index]: checked });
			}
		},
		[multiSelect],
	);

	const handleSelectAll = useCallback(
		(checked: boolean) => {
			if (multiSelect) {
				const newSelection: Record<string, boolean> = {};
				if (checked) {
					data.forEach((_, index) => {
						newSelection[index] = true;
					});
				}
				setRowSelection(newSelection);
			}
		},
		[data, multiSelect],
	);

	const columns: ColumnDef<TableRow>[] = useMemo(
		() => [
			{
				cell: ({ row }) => {
					const globalIndex = (currentPage - 1) * itemsPerPage + row.index;
					const isSelected = rowSelection[globalIndex] || false;

					return (
						<div className="flex items-center justify-start gap-2 pr-1.5">
							<Checkbox
								classNames={{
									wrapper: "after:bg-primary after:rounded",
								}}
								isSelected={isSelected}
								onValueChange={(checked) => handleRowSelection(globalIndex, checked)}
								size="sm"
							/>
							<div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
								<button
									className="flex items-center justify-center p-0.5 text-gray-600 transition-colors hover:text-gray-800"
									onClick={() => onRowView?.(row.original)}
									title="نمایش"
									type="button"
								>
									<Eye className="h-5 w-5 fill-secondary text-transparent" />
								</button>
								<button
									className="flex items-center justify-center p-0.5 text-primary transition-colors hover:text-primary/80"
									onClick={() => onRowEdit?.(row.original)}
									title="ویرایش"
									type="button"
								>
									<Edit className="h-5 w-5 fill-primary text-transparent" />
								</button>
							</div>
						</div>
					);
				},
				enableSorting: false,
				header: ({ table: headerTable }) => {
					const allRowsSelected =
						Object.keys(rowSelection).length === data.length && data.length > 0;
					const someRowsSelected =
						Object.keys(rowSelection).length > 0 && !allRowsSelected;

					return (
						<div className="flex h-full items-center justify-start gap-5">
							{multiSelect && (
								<Checkbox
									classNames={{
										wrapper: "after:bg-primary after:rounded",
									}}
									isIndeterminate={someRowsSelected}
									isSelected={allRowsSelected}
									onValueChange={handleSelectAll}
									size="sm"
								/>
							)}
							<button
								className="flex items-center justify-center rounded-lg bg-secondary p-1.5 transition-colors hover:bg-secondary/90"
								onClick={applyFilters}
								title="جستجو"
								type="button"
							>
								<Search className="text-white" size={16} />
							</button>
						</div>
					);
				},
				id: "select",
				size: 120,
			},
			...columnConfigs.map((config) => ({
				accessorKey: config.accessorKey,
				cell: ({ row }: { row: { original: TableRow } }) => {
					const value = row.original[config.accessorKey as keyof TableRow];
					return renderCellContent(config, value as string | undefined);
				},
				enableSorting: config.enableSorting !== false,
				header: ({
					column,
				}: {
					column: { getIsSorted: () => "asc" | "desc" | false };
				}) => (
					<TableHeaderCell
						config={config}
						currentSort={column.getIsSorted()}
						filterValue={getFilter(config.accessorKey)}
						onApplyFilters={applyFilters}
						onFilterChange={(value) => setFilter(config.accessorKey, value)}
						onSort={() => handleSort(config.accessorKey, column.getIsSorted())}
					/>
				),
				size: config.size || 150,
			})),
		],
		[
			applyFilters,
			columnConfigs,
			currentPage,
			data.length,
			getFilter,
			handleRowSelection,
			handleSelectAll,
			handleSort,
			itemsPerPage,
			multiSelect,
			onRowEdit,
			onRowView,
			renderCellContent,
			rowSelection,
			setFilter,
		],
	);

	const table = useReactTable({
		columns,
		data,
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		manualFiltering: true,
		manualPagination: true,
		manualSorting: true,
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		state: {
			columnFilters,
			rowSelection,
			sorting,
		},
	});

	const columnWidths = useMemo(() => {
		return columns.map((col) => col.size || 150);
	}, [columns]);

	const totalPages = totalItems
		? Math.ceil(totalItems / itemsPerPage)
		: Math.ceil(data.length / itemsPerPage);

	const handlePageChange = useCallback(
		(page: number) => {
			if (onPageChange) {
				onPageChange(page);
			} else {
				setInternalCurrentPage(page);
			}
		},
		[onPageChange],
	);

	useEffect(() => {
		if (onSelectionChange) {
			const selectedIds = Object.keys(rowSelection)
				.filter((key) => rowSelection[key])
				.map((index) => {
					const dataIndex = Number.parseInt(index, 10);
					return data[dataIndex]?.id;
				})
				.filter((id): id is number => id !== undefined);

			onSelectionChange(selectedIds);
		}
	}, [data, onSelectionChange, rowSelection]);

	if (loading) {
		return (
			<div className="flex h-full flex-col items-center justify-center rounded-2xl bg-primary p-3">
				<Spinner color="warning" size="lg" />
			</div>
		);
	}

	return (
		<div className="flex h-full flex-col rounded-2xl bg-primary p-3" dir="rtl">
			<div className="flex min-h-0 flex-1 flex-col">
				<div className="shrink-0 pb-1.5">
					<div
						className="scrollbar-hide overflow-x-scroll"
						ref={headerScrollRef}
						style={{
							msOverflowStyle: "none",
							scrollbarWidth: "none",
						}}
					>
						<div
							className="flex items-center gap-2 pr-3"
							style={{ minWidth: "max-content" }}
						>
							{table.getHeaderGroups().map((headerGroup) => (
								<React.Fragment key={headerGroup.id}>
									{headerGroup.headers.map((header, index) => (
										<div
											className="shrink-0"
											key={header.id}
											style={{
												width: `${columnWidths[index]}px`,
											}}
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
										</div>
									))}
								</React.Fragment>
							))}
						</div>
					</div>
				</div>

				<div
					className="custom-scrollbar flex-1 overflow-auto"
					ref={scrollContainerRef}
					style={{
						scrollbarGutter: "stable",
					}}
				>
					<div className="pr-3">
						<div className="flex flex-col gap-1" style={{ minWidth: "max-content" }}>
							{data.length > 0 ? (
								data.map((rowData, rowIndex) => {
									const globalIndex = (currentPage - 1) * itemsPerPage + rowIndex;
									const isSelected = rowSelection[globalIndex] || false;

									return (
										<div
											className="group shrink-0 rounded-lg bg-white transition-colors hover:bg-orange-50"
											key={rowData.id}
										>
											<div className="flex items-center gap-2 px-3 py-1.5">
												{columns.map((column, colIndex) => {
													const cellContent =
														colIndex === 0 ? (
															<div className="flex justify-start gap-2 pr-1.5">
																<Checkbox
																	classNames={{
																		wrapper: "after:bg-primary after:rounded",
																	}}
																	isSelected={isSelected}
																	onValueChange={(checked) =>
																		handleRowSelection(globalIndex, checked)
																	}
																	size="sm"
																/>
																<div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
																	<button
																		className="group/icon flex items-center justify-center p-0.5 text-gray-600 transition-all duration-200 hover:scale-125 hover:text-gray-800"
																		onClick={() => onRowView?.(rowData)}
																		title="نمایش"
																		type="button"
																	>
																		<Eye className="h-5 w-5 fill-secondary text-transparent transition-transform duration-200 group-hover/icon:scale-110" />
																	</button>
																	<button
																		className="group/icon flex items-center justify-center p-0.5 text-primary transition-all duration-200 hover:scale-125 hover:text-primary/80"
																		onClick={() => onRowEdit?.(rowData)}
																		title="ویرایش"
																		type="button"
																	>
																		<Edit className="h-5 w-5 fill-primary text-transparent transition-transform duration-200 group-hover/icon:scale-110" />
																	</button>
																</div>
															</div>
														) : column.accessorKey ? (
															(() => {
																const config = columnConfigs[colIndex - 1];
																const value =
																	rowData[column.accessorKey as keyof TableRow];
																return renderCellContent(
																	config,
																	value as string | undefined,
																);
															})()
														) : null;

													return (
														<div
															className="shrink-0"
															key={column.id || colIndex}
															style={{
																width: `${columnWidths[colIndex]}px`,
															}}
														>
															{cellContent}
														</div>
													);
												})}
											</div>
										</div>
									);
								})
							) : (
								<div className="shrink-0 rounded-lg bg-white p-6 text-center">
									<p className="text-gray-500 text-xs">نتیجه‌ای یافت نشد</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{totalPages > 1 && (
				<div className="shrink-0 pt-3">
					<div className="flex items-center justify-center">
						<Pagination
							classNames={{
								cursor:
									"bg-secondary text-white font-semibold shadow-sm min-w-[28px] h-7",
								item: "text-xs font-medium text-gray-700 hover:bg-gray-200 min-w-[28px] h-7",
								next: "bg-gray-100 hover:bg-gray-200 rounded-lg min-w-[28px] h-7",
								prev: "bg-gray-100 hover:bg-gray-200 rounded-lg min-w-[28px] h-7",
								wrapper: "gap-1",
							}}
							dir="ltr"
							onChange={handlePageChange}
							page={currentPage}
							showControls={true}
							total={totalPages}
						/>
					</div>
				</div>
			)}

			<style jsx={true}>{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 8px;
					height: 8px;
				}

				.custom-scrollbar::-webkit-scrollbar-track {
					background: transparent;
					border-radius: 8px;
				}

				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: rgba(0, 0, 0, 0.2);
					border-radius: 8px;
					border: 2px solid transparent;
					background-clip: padding-box;
				}

				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background: rgba(0, 0, 0, 0.3);
					border: 2px solid transparent;
					background-clip: padding-box;
				}

				.custom-scrollbar::-webkit-scrollbar-corner {
					background: transparent;
				}

				.custom-scrollbar {
					scrollbar-width: thin;
					scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
				}

				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}

				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</div>
	);
};

// ============================================================================
// Example Usage
// ============================================================================

export default function TableBuilderExample() {
	const [mockData] = useState<TableRow[]>([
		{
			date: "1403/11/11",
			email: "virzcell@gmail.com",
			id: 1,
			name: "مهدی حیدری دخت",
			phone: "+980215686868",
			role: "مدیر",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "mina.irani@gmail.com",
			id: 2,
			name: "نگارش سبز",
			phone: "+980217854785",
			role: "کارمند",
			status: "inactive",
		},
		{
			date: "1403/11/11",
			email: "line.moshaver@gmail.com",
			id: 3,
			name: "مشاور آنلاین",
			phone: "02132121121",
			role: "مشاور",
			status: "pending",
		},
		{
			date: "1403/11/11",
			email: "info@rahesabz.com",
			id: 4,
			name: "نگار راه سبز",
			phone: "03133352545",
			role: "کارمند",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "info@pardazco.com",
			id: 5,
			name: "ایده پرداز",
			phone: "0217212122",
			role: "مدیر",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "",
			id: 6,
			name: "درایب استودیو",
			phone: "09309262872",
			role: "کارآموز",
			status: "inactive",
		},
		{
			date: "1403/11/11",
			email: "samanbime@gmail.com",
			id: 7,
			name: "بیمه سامان",
			phone: "0212252625",
			role: "کارمند",
			status: "pending",
		},
		{
			date: "1403/11/11",
			email: "info@hoshmand.com",
			id: 8,
			name: "هوشمند سازان فناور",
			phone: "0214424243",
			role: "مشاور",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "info@mobailgostar.com",
			id: 9,
			name: "موبایل گستر ایران",
			phone: "0213212525",
			role: "کارمند",
			status: "inactive",
		},
		{
			date: "1403/11/11",
			email: "info@borna.com",
			id: 10,
			name: "برنا ایده پرداز",
			phone: "0215857585",
			role: "مدیر",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "rashin@gmail.com",
			id: 11,
			name: "سخت افزار راشین",
			phone: "0313253525",
			role: "کارمند",
			status: "pending",
		},
		{
			date: "1403/11/11",
			email: "zabandidar@gmail.com",
			id: 12,
			name: "آموزشگاه زبان دیدار",
			phone: "0315454546",
			role: "مشاور",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "golriz@gmail.com",
			id: 13,
			name: "آموزشگاه گلریز",
			phone: "0219989887",
			role: "کارآموز",
			status: "inactive",
		},
	]);

	const columnConfig: ColumnConfig[] = [
		{
			accessorKey: "name",
			enableFiltering: true,
			enableSorting: true,
			filterType: "text",
			header: "نام و نام خانوادگی",
			size: 180,
			sortableFieldName: "firstName",
		},
		{
			accessorKey: "phone",
			enableFiltering: true,
			enableSorting: true,
			filterType: "text",
			header: "تلفن",
			size: 140,
			sortableFieldName: "phone",
		},
		{
			accessorKey: "email",
			enableFiltering: true,
			enableSorting: true,
			filterType: "text",
			header: "ایمیل",
			size: 200,
			sortableFieldName: "email",
		},
		{
			accessorKey: "role",
			enableFiltering: true,
			enableSorting: true,
			filterType: "select-multi",
			header: "نقش کاربری",
			selectOptions: ["مدیر", "کارمند", "مشاور", "کارآموز"],
			size: 150,
			sortableFieldName: "position",
		},
		{
			accessorKey: "status",
			badge: {
				active: {
					bgColor: "#10b981",
					label: "فعال",
					textColor: "#ffffff",
				},
				inactive: {
					bgColor: "#ef4444",
					label: "غیرفعال",
					textColor: "#ffffff",
				},
				pending: {
					bgColor: "#f59e0b",
					label: "در انتظار",
					textColor: "#ffffff",
				},
			},
			enableFiltering: true,
			enableSorting: true,
			filterType: "select-single",
			header: "وضعیت",
			selectOptions: ["فعال", "غیرفعال", "در انتظار"],
			size: 140,
		},
		{
			accessorKey: "date",
			enableFiltering: true,
			enableSorting: true,
			filterType: "date-range",
			header: "تاریخ ایجاد",
			size: 160,
			sortableFieldName: "createdAt",
		},
	];

	const handleFilterChange = useCallback((filters: Record<string, FilterValue>): void => {
		console.log("🎯 Filter Change:", filters);
	}, []);

	const handleSortChange = useCallback(
		(sortField: string | null, sortOrder: "asc" | "desc" | null): void => {
			console.log("📊 Sort Change:", { sortField, sortOrder });
		},
		[],
	);

	const handleEdit = useCallback((row: TableRow): void => {
		console.log("✏️ Edit row:", row);
	}, []);

	const handleView = useCallback((row: TableRow): void => {
		console.log("👁️ View row:", row);
	}, []);

	const handleSelectionChange = useCallback((selectedIds: number[]): void => {
		console.log("✅ Selected IDs:", selectedIds);
	}, []);

	return (
		<TableBuilder
			columns={columnConfig}
			data={mockData}
			itemsPerPage={1}
			multiSelect={false}
			onFilterChange={handleFilterChange}
			onRowEdit={handleEdit}
			onRowView={handleView}
			onSelectionChange={handleSelectionChange}
			onSortChange={handleSortChange}
		/>
	);
}
