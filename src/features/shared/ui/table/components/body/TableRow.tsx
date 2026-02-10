"use client";

import { Checkbox } from "@heroui/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye } from "@/icons";
import type { ColumnConfig, TableRow as TableRowType } from "../../types";

interface TableRowProps {
	row: TableRowType;
	isSelected: boolean;
	columns: ColumnDef<TableRowType>[];
	columnConfigs: ColumnConfig[];
	columnWidths: number[];
	onRowSelection: (checked: boolean) => void;
	onRowView?: (row: TableRowType) => void;
	onRowEdit?: (row: TableRowType) => void;
	renderCellContent: (config: ColumnConfig, value: string | undefined) => React.ReactNode;
}

export const TableRow = ({
	row,
	isSelected,
	columns,
	columnConfigs,
	columnWidths,
	onRowSelection,
	onRowView,
	onRowEdit,
	renderCellContent,
}: TableRowProps) => {
	return (
		<div className="group shrink-0 rounded-lg bg-white transition-colors hover:bg-orange-50">
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
									onValueChange={onRowSelection}
									size="sm"
								/>
								<div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
									<button
										className="group/icon flex items-center justify-center p-0.5 text-gray-600 transition-all duration-200 hover:scale-125 hover:text-gray-800"
										onClick={() => onRowView?.(row)}
										title="نمایش"
										type="button"
									>
										<Eye className="h-5 w-5 transition-transform duration-200 group-hover/icon:scale-110" />
									</button>
									<button
										className="group/icon flex items-center justify-center p-0.5 text-primary transition-all duration-200 hover:scale-125 hover:text-primary/80"
										onClick={() => onRowEdit?.(row)}
										title="ویرایش"
										type="button"
									>
										<Edit className="h-5 w-5 transition-transform duration-200 group-hover/icon:scale-110" />
									</button>
								</div>
							</div>
						) : "accessorKey" in column && column.accessorKey ? (
							(() => {
								const config = columnConfigs[colIndex - 1];
								const value = row[column.accessorKey as keyof TableRowType];
								return renderCellContent(config, value as string | undefined);
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
};
