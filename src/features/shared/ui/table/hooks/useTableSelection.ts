"use client";

import { useCallback, useEffect, useState } from "react";
import type { TableRow } from "../types";

interface UseTableSelectionProps {
	data: TableRow[];
	multiSelect?: boolean;
	onSelectionChange?: (selectedIds: number[]) => void;
	currentPage: number;
	itemsPerPage: number;
}

export const useTableSelection = ({
	data,
	multiSelect = true,
	onSelectionChange,
	currentPage,
	itemsPerPage,
}: UseTableSelectionProps) => {
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

	const handleRowSelection = useCallback(
		(index: number, checked: boolean) => {
			setRowSelection((prev) => {
				if (multiSelect) {
					return {
						...prev,
						[index]: checked,
					};
				}
				return { [index]: checked };
			});
		},
		[multiSelect],
	);

	const handleSelectAll = useCallback(
		(checked: boolean) => {
			if (multiSelect) {
				setRowSelection((prev) => {
					if (!checked) {
						return {};
					}
					const newSelection: Record<string, boolean> = { ...prev };
					data.forEach((_, index) => {
						const globalIndex = (currentPage - 1) * itemsPerPage + index;
						newSelection[globalIndex] = true;
					});
					return newSelection;
				});
			}
		},
		[data, multiSelect, currentPage, itemsPerPage],
	);

	useEffect(() => {
		if (onSelectionChange) {
			const selectedIndices = Object.keys(rowSelection).filter(
				(key) => rowSelection[key],
			);
			const selectedIds = selectedIndices
				.map((index) => {
					const pageIndex = Number.parseInt(index, 10) % itemsPerPage;
					const page = Math.floor(Number.parseInt(index, 10) / itemsPerPage) + 1;

					if (page === currentPage && data[pageIndex]) {
						return data[pageIndex].id;
					}
					return;
				})
				.filter((id): id is number => id !== undefined);

			onSelectionChange(selectedIds);
		}
	}, [data, onSelectionChange, rowSelection, currentPage, itemsPerPage]);

	return {
		handleRowSelection,
		handleSelectAll,
		rowSelection,
		setRowSelection,
	};
};
