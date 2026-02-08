"use client";

import type { RefObject } from "react";
import type { ColumnConfig, TableRow as TableRowType } from "../../types";
import { TableRow } from "./TableRow";

interface TableBodyProps {
	data: TableRowType[];
	columns: Array<{ id: string; accessorKey?: string; size?: number }>;
	columnConfigs: ColumnConfig[];
	columnWidths: number[];
	rowSelection: Record<string, boolean>;
	currentPage: number;
	itemsPerPage: number;
	scrollContainerRef: RefObject<HTMLDivElement>;
	onRowSelection: (index: number, checked: boolean) => void;
	onRowView?: (row: TableRowType) => void;
	onRowEdit?: (row: TableRowType) => void;
	renderCellContent: (config: ColumnConfig, value: string | undefined) => React.ReactNode;
}

export const TableBody = ({
	data,
	columns,
	columnConfigs,
	columnWidths,
	rowSelection,
	currentPage,
	itemsPerPage,
	scrollContainerRef,
	onRowSelection,
	onRowView,
	onRowEdit,
	renderCellContent,
}: TableBodyProps) => {
	return (
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
								<TableRow
									columnConfigs={columnConfigs}
									columns={columns}
									columnWidths={columnWidths}
									isSelected={isSelected}
									key={rowData.id}
									onRowEdit={onRowEdit}
									onRowSelection={(checked) => onRowSelection(globalIndex, checked)}
									onRowView={onRowView}
									renderCellContent={renderCellContent}
									row={rowData}
								/>
							);
						})
					) : (
						<div className="shrink-0 rounded-lg bg-white p-6 text-center">
							<p className="text-gray-500 text-xs">نتیجه‌ای یافت نشد</p>
						</div>
					)}
				</div>
			</div>

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
			`}</style>
		</div>
	);
};
