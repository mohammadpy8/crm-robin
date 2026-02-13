import { useCallback } from "react";
import type { FilterValue, TableRow } from "@/features/shared/ui/table";
import { useUsersQuery } from "../api";
import { useUsersStore } from "../store";

export const useTableHandlers = () => {
	const { data = [], isLoading, isFetching, isError } = useUsersQuery();

	const currentPage = useUsersStore((state) => state.currentPage);
	const totalItems = data.length;

	const setCurrentPage = useUsersStore((state) => state.setCurrentPage);
	const setFilters = useUsersStore((state) => state.setFilters);
	const setSort = useUsersStore((state) => state.setSort);
	const setSelectedIds = useUsersStore((state) => state.setSelectedIds);
	const openForm = useUsersStore((state) => state.openForm);

	const handleFilterChange = useCallback(
		(newFilters: Record<string, FilterValue>): void => {
			setFilters(newFilters);
		},
		[setFilters],
	);

	const handleSortChange = useCallback(
		(field: string | null, order: "asc" | "desc" | null): void => {
			setSort(field, order);
		},
		[setSort],
	);

	const handlePageChange = useCallback(
		(page: number): void => {
			setCurrentPage(page);
		},
		[setCurrentPage],
	);

	const handleEdit = useCallback(
		(row: TableRow): void => {
			openForm("edit", row as Record<string, string>);
		},
		[openForm],
	);

	const handleView = useCallback(
		(row: TableRow): void => {
			openForm("view", row as Record<string, string>);
		},
		[openForm],
	);

	const handleSelectionChange = useCallback(
		(ids: number[]): void => {
			setSelectedIds(ids);
		},
		[setSelectedIds],
	);

	return {
		handlers: {
			onEdit: handleEdit,
			onFilterChange: handleFilterChange,
			onPageChange: handlePageChange,
			onSelectionChange: handleSelectionChange,
			onSortChange: handleSortChange,
			onView: handleView,
		},
		state: {
			currentPage,
			data,
			isError,
			isFetching,
			isLoading,
			totalItems,
		},
	};
};
