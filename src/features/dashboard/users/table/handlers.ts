// features/dashboard/users/table/handlers.ts
import { useCallback, useState } from "react";
import type { FilterValue, TableRow } from "@/features/shared/ui/table";

export const useTableHandlers = () => {
	// 🎯 State Management
	const [currentPage, setCurrentPage] = useState(1);
	const [filters, setFilters] = useState<Record<string, FilterValue>>({});
	const [sortField, setSortField] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
	const [selectedIds, setSelectedIds] = useState<number[]>([]);

	// 🔄 Handlers
	const handleFilterChange = useCallback(
		(newFilters: Record<string, FilterValue>): void => {
			console.log("🎯 Filter Change:", newFilters);
			setFilters(newFilters);
			setCurrentPage(1); // Reset to first page on filter change
		},
		[],
	);

	const handleSortChange = useCallback(
		(field: string | null, order: "asc" | "desc" | null): void => {
			console.log("📊 Sort Change:", { field, order });
			setSortField(field);
			setSortOrder(order);
		},
		[],
	);

	const handlePageChange = useCallback((page: number): void => {
		console.log("📄 Page Change:", page);
		setCurrentPage(page);
	}, []);

	const handleEdit = useCallback((row: TableRow): void => {
		console.log("✏️ Edit row:", row);
		// TODO: Open edit form with row data
		// useUsersFormStore.getState().openEdit(row);
	}, []);

	const handleView = useCallback((row: TableRow): void => {
		console.log("👁️ View row:", row);
		// TODO: Navigate to view page or open modal
	}, []);

	const handleSelectionChange = useCallback((ids: number[]): void => {
		console.log("✅ Selected IDs:", ids);
		setSelectedIds(ids);
	}, []);

	return {
		// State
		currentPage,
		filters,
		// Handlers
		handleEdit,
		handleFilterChange,
		handlePageChange,
		handleSelectionChange,
		handleSortChange,
		handleView,
		selectedIds,
		sortField,
		sortOrder,
	};
};
