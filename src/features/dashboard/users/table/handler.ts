import { useCallback } from "react";
import type { FilterValue, TableRow } from "@/features/shared/ui/table";

export const useTableHandlers = () => {
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

	return {
		handleEdit,
		handleFilterChange,
		handleSelectionChange,
		handleSortChange,
		handleView,
	};
};
