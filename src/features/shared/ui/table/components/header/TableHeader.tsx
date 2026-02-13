// features/shared/ui/table/components/header/TableHeader.tsx
"use client";

import { Checkbox } from "@heroui/react";
import type { HeaderGroup } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Search } from "lucide-react";
import React from "react";
import type { TableRow } from "../../types";

interface TableHeaderProps {
	headerGroups: HeaderGroup<TableRow>[];
	columnWidths: number[];
	multiSelect: boolean;
	allRowsSelected: boolean;
	someRowsSelected: boolean;
	onSelectAll: (checked: boolean) => void;
	onApplyFilters: () => void;
}

export const TableHeader = ({
	headerGroups,
	columnWidths,
	multiSelect,
	allRowsSelected,
	someRowsSelected,
	onSelectAll,
	onApplyFilters,
}: TableHeaderProps) => {
	return (
		<div className="shrink-0 pb-1.5">
			<div className="flex items-center gap-2">
				{headerGroups.map((headerGroup) => (
					<React.Fragment key={headerGroup.id}>
						{headerGroup.headers.map((header, index) => {
							if (index === 0) {
								return (
									<div
										className="shrink-0"
										key={header.id}
										style={{
											width: `${columnWidths[index]}px`,
										}}
									>
										<div className="flex h-full items-center justify-start gap-5 rounded-lg px-2 py-1.5">
											{multiSelect && (
												<Checkbox
													classNames={{
														wrapper:
															"after:bg-primary after:border-1  after:rounded bg-white",
													}}
													isIndeterminate={someRowsSelected}
													isSelected={allRowsSelected}
													onValueChange={onSelectAll}
													size="sm"
												/>
											)}
											<button
												className="flex items-center justify-center rounded-lg bg-secondary p-1.5 transition-colors hover:bg-secondary/90"
												onClick={onApplyFilters}
												title="جستجو"
												type="button"
											>
												<Search className="text-white" size={16} />
											</button>
										</div>
									</div>
								);
							}

							return (
								<div
									className="shrink-0"
									key={header.id}
									style={{
										width: `${columnWidths[index]}px`,
									}}
								>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</div>
							);
						})}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
