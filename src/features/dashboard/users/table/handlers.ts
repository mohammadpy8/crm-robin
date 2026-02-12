import { useCallback, useEffect } from "react";
import { authService } from "@/api/services";
import type { FilterValue, TableRow } from "@/features/shared/ui/table";
import { useUsersStore } from "../store";
import { mapUserListToTableRows } from "../utils";

export const useTableHandlers = () => {
	const tableData = useUsersStore((state) => state.tableData);
	const currentPage = useUsersStore((state) => state.currentPage);
	const totalItems = useUsersStore((state) => state.totalItems);
	const isLoading = useUsersStore((state) => state.isLoading);

	const setTableData = useUsersStore((state) => state.setTableData);
	const setTableLoading = useUsersStore((state) => state.setTableLoading);
	const setCurrentPage = useUsersStore((state) => state.setCurrentPage);
	const setFilters = useUsersStore((state) => state.setFilters);
	const setSort = useUsersStore((state) => state.setSort);
	const setSelectedIds = useUsersStore((state) => state.setSelectedIds);
	const openForm = useUsersStore((state) => state.openForm);

	useEffect(() => {
		if (tableData.length === 0 && isLoading) {
			const loadData = async () => {
				setTableLoading(true);
				const updatedUserList = await authService.getUserList();
				const mappedData = mapUserListToTableRows(updatedUserList);
				setTableData(mappedData);
				setTableLoading(false);
			};
			loadData();
		}
	}, [tableData.length, isLoading, setTableData, setTableLoading]);

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
			data: tableData,
			isLoading,
			totalItems,
		},
	};
};
