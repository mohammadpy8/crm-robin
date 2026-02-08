"use client";

import { useCallback, useState } from "react";
import type { SortingState } from "@tanstack/react-table";

export const useTableSort = (
	onSortChange?: (sortField: string | null, sortOrder: "asc" | "desc" | null) => void,
) => {
	const [sorting, setSorting] = useState<SortingState>([]);

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

	return { sorting, setSorting, handleSort };
};
