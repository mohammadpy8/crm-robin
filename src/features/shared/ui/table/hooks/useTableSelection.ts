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
						const globalIndex = (currentPage - 1) * itemsPerPage + index;
						newSelection[globalIndex] = true;
					});
				}
				setRowSelection(newSelection);
			}
		},
		[data, multiSelect, currentPage, itemsPerPage],
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

	return {
		handleRowSelection,
		handleSelectAll,
		rowSelection,
		setRowSelection,
	};
};
