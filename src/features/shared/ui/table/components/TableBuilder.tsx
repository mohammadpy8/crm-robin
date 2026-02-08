"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useMemo, useRef } from "react";
import {
	useTableFilters,
	useTablePagination,
	useTableSelection,
	useTableSort,
	useSyncScroll,
} from "../hooks";
import type { ColumnConfig, TableBuilderProps, TableRow } from "../types";
import { TableBody } from "./body";
import { BadgeCell, DefaultCell, EmailCell, PhoneCell } from "./cells";
import { TableHeader, TableHeaderCell } from "./header";
import { TablePagination } from "./pagination";
import { LoadingState } from "./shared";

export const TableBuilder = ({
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
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const headerScrollRef = useRef<HTMLDivElement>(null);

	const { sorting, handleSort } = useTableSort(onSortChange);
	const { setFilter, getFilter, getAllFilters } = useTableFilters();
	const { currentPage, totalPages, handlePageChange } = useTablePagination({
		itemsPerPage,
		totalItems,
		dataLength: data.length,
		externalCurrentPage,
		onPageChange,
	});
	const { rowSelection, handleRowSelection, handleSelectAll } = useTableSelection({
		data,
		multiSelect,
		onSelectionChange,
		currentPage,
		itemsPerPage,
	});

	useSyncScroll(headerScrollRef, scrollContainerRef);

	const applyFilters = useCallback((): void => {
		if (onFilterChange) {
			const filters = getAllFilters();
			const validFilters = Object.entries(filters)
				.filter(([, value]) => {
					if (Array.isArray(value)) {
						return value.length > 0;
					}
					if (value && typeof value === "object" && "format" in value) {
						return true;
					}
					return value !== "";
				})
				.reduce(
					(acc, [key, value]) => {
						acc[key] = value;
						return acc;
					},
					{} as Record<string, (typeof filters)[string]>,
				);

			onFilterChange(validFilters);
		}

		if (onPageChange) {
			onPageChange(1);
		}
	}, [getAllFilters, onFilterChange, onPageChange]);

	const renderCellContent = useCallback(
		(config: ColumnConfig, value: string | undefined) => {
			if (config.cell) {
				return <div className="pr-2 text-right">{config.cell(value)}</div>;
			}

			if (config.badge) {
				return <BadgeCell badgeConfig={config.badge} value={value} />;
			}

			if (config.accessorKey === "email") {
				return <EmailCell value={value} />;
			}

			if (config.accessorKey === "phone") {
				return <PhoneCell value={value} />;
			}

			return <DefaultCell value={value} />;
		},
		[],
	);

	const columns: ColumnDef<TableRow>[] = useMemo(
		() => [
			{
				cell: () => null,
				enableSorting: false,
				header: () => null,
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
		[applyFilters, columnConfigs, getFilter, handleSort, renderCellContent, setFilter],
	);

	const table = useReactTable({
		columns,
		data,
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		manualFiltering: true,
		manualPagination: true,
		manualSorting: true,
		state: {
			sorting,
			rowSelection,
		},
	});

	const columnWidths = useMemo(() => {
		return columns.map((col) => col.size || 150);
	}, [columns]);

	const allRowsSelected = useMemo(() => {
		return Object.keys(rowSelection).length === data.length && data.length > 0;
	}, [rowSelection, data.length]);

	const someRowsSelected = useMemo(() => {
		return Object.keys(rowSelection).length > 0 && !allRowsSelected;
	}, [rowSelection, allRowsSelected]);

	if (loading) {
		return <LoadingState />;
	}

	return (
		<div className="flex h-full flex-col rounded-2xl bg-primary p-3" dir="rtl">
			<div className="flex min-h-0 flex-1 flex-col">
				<TableHeader
					allRowsSelected={allRowsSelected}
					columnWidths={columnWidths}
					headerGroups={table.getHeaderGroups()}
					headerScrollRef={headerScrollRef}
					multiSelect={multiSelect}
					onApplyFilters={applyFilters}
					onSelectAll={handleSelectAll}
					someRowsSelected={someRowsSelected}
				/>

				<TableBody
					columnConfigs={columnConfigs}
					columnWidths={columnWidths}
					columns={columns}
					currentPage={currentPage}
					data={data}
					itemsPerPage={itemsPerPage}
					onRowEdit={onRowEdit}
					onRowSelection={handleRowSelection}
					onRowView={onRowView}
					renderCellContent={renderCellContent}
					rowSelection={rowSelection}
					scrollContainerRef={scrollContainerRef}
				/>
			</div>

			<TablePagination
				currentPage={currentPage}
				onPageChange={handlePageChange}
				totalPages={totalPages}
			/>

			<style jsx={true}>{`
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
