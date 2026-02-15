"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ColumnConfig, TableRow as TableRowType } from "../../types";
import { TableRow } from "./TableRow";

interface TableBodyProps {
	data: TableRowType[];
	columns: ColumnDef<TableRowType>[];
	columnConfigs: ColumnConfig[];
	columnWidths: number[];
	rowSelection: Record<string, boolean>;
	currentPage: number;
	itemsPerPage: number;
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
	onRowSelection,
	onRowView,
	onRowEdit,
	renderCellContent,
}: TableBodyProps) => {
	return (
		<div className="flex flex-col gap-1">
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
				<div className="flex items-center justify-center rounded-lg bg-white py-20">
					<p className="text-gray-500 text-xs">نتیجه‌ای یافت نشد</p>
				</div>
			)}
		</div>
	);
};
