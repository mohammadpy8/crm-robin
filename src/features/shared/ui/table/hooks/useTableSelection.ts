/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: <> */
"use client";

import { useCallback, useEffect, useState } from "react";
import type { TableRow } from "../types";

interface UseTableSelectionProps {
	data: TableRow[];
	multiSelect?: boolean;
	onSelectionChange?: (selectedIds: number[]) => void;
	currentPage: number;
	itemsPerPage: number;
	externalSelectedIds?: number[];
}

export const useTableSelection = ({
	data,
	multiSelect = true,
	onSelectionChange,
	currentPage,
	itemsPerPage,
	externalSelectedIds = [],
}: UseTableSelectionProps) => {
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

	useEffect(() => {
		if (externalSelectedIds.length === 0) {
			setRowSelection({});
			return;
		}

		const selection: Record<string, boolean> = {};
		data.forEach((row, index) => {
			if (row.id && externalSelectedIds.includes(row.id)) {
				const globalIndex = (currentPage - 1) * itemsPerPage + index;
				selection[globalIndex] = true;
			}
		});
		setRowSelection(selection);
	}, [externalSelectedIds, data, currentPage, itemsPerPage]);


	const getSelectedIds = useCallback(
		(selection: Record<string, boolean>): number[] => {
			const selectedIndices = Object.keys(selection).filter((key) => selection[key]);

			return selectedIndices
				.map((index) => {
					const pageIndex = Number.parseInt(index, 10) % itemsPerPage;
					const page = Math.floor(Number.parseInt(index, 10) / itemsPerPage) + 1;

					if (page === currentPage && data[pageIndex]) {
						return data[pageIndex].id;
					}
					return;
				})
				.filter((id): id is number => id !== undefined);
		},
		[data, currentPage, itemsPerPage],
	);

	const handleRowSelection = useCallback(
		(index: number, checked: boolean) => {
			const nextSelection = multiSelect
				? { ...rowSelection, [index]: checked }
				: { [index]: checked };

			setRowSelection(nextSelection);

			if (onSelectionChange) {
				const selectedIds = getSelectedIds(nextSelection);
				onSelectionChange(selectedIds);
			}
		},
		[rowSelection, multiSelect, onSelectionChange, getSelectedIds],
	);


	const handleSelectAll = useCallback(
		(checked: boolean) => {
			if (!multiSelect) {return;}

			const nextSelection: Record<string, boolean> = checked
				? data.reduce(
						(acc, _, index) => {
							const globalIndex = (currentPage - 1) * itemsPerPage + index;
							acc[globalIndex] = true;
							return acc;
						},
						{} as Record<string, boolean>,
					)
				: {};

			setRowSelection(nextSelection);

			if (onSelectionChange) {
				const selectedIds = checked
					? data.map((row) => row.id).filter((id): id is number => id !== undefined)
					: [];
				onSelectionChange(selectedIds);
			}
		},
		[data, multiSelect, currentPage, itemsPerPage, onSelectionChange],
	);

	return {
		handleRowSelection,
		handleSelectAll,
		rowSelection,
		setRowSelection,
	};
};
