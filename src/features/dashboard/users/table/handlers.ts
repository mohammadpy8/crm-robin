import { useCallback, useEffect } from "react";
import type { FilterValue, TableRow } from "@/features/shared/ui/table";
import { useUsersStore } from "../store";
import type { UserData } from "../types/store";

const MOCK_USERS: UserData[] = [
	{
		createdAt: "1403/10/15",
		email: "ali@example.com",
		fullName: "علی احمدی",
		id: 111,
		role: "1",
	},
	{
		createdAt: "1403/09/20",
		email: "sara@example.com",
		fullName: "سارا محمدی",
		id: 2,
		role: "2",
	},
	{
		createdAt: "1403/08/10",
		email: "reza@example.com",
		fullName: "رضا کریمی",
		id: 3,
		role: "3",
	},
	{
		createdAt: "1403/11/01",
		email: "maryam@example.com",
		fullName: "مریم حسینی",
		id: 4,
		role: "1",
	},
	{
		createdAt: "1403/10/25",
		email: "hossein@example.com",
		fullName: "حسین رضایی",
		id: 5,
		role: "2",
	},
	{
		createdAt: "1403/10/15",
		email: "zahra@example.com",
		fullName: "زهرا احمدی",
		id: 6,
		role: "1",
	},
	{
		createdAt: "1403/09/20",
		email: "mehdi@example.com",
		fullName: "مهدی محمدی",
		id: 7,
		role: "2",
	},
	{
		createdAt: "1403/08/10",
		email: "fatemeh@example.com",
		fullName: "فاطمه کریمی",
		id: 8,
		role: "3",
	},
	{
		createdAt: "1403/11/01",
		email: "amir@example.com",
		fullName: "امیر حسینی",
		id: 9,
		role: "1",
	},
	{
		createdAt: "1403/10/25",
		email: "neda@example.com",
		fullName: "ندا رضایی",
		id: 10,
		role: "2",
	},
	{
		createdAt: "1403/10/15",
		email: "mohammad@example.com",
		fullName: "محمد احمدی",
		id: 11,
		role: "1",
	},
	{
		createdAt: "1403/09/20",
		email: "leila@example.com",
		fullName: "لیلا محمدی",
		id: 12,
		role: "2",
	},
	{
		createdAt: "1403/08/10",
		email: "javad@example.com",
		fullName: "جواد کریمی",
		id: 13,
		role: "3",
	},
	{
		createdAt: "1403/11/01",
		email: "mina@example.com",
		fullName: "مینا حسینی",
		id: 14,
		role: "1",
	},
	{
		createdAt: "1403/10/25",
		email: "hassan@example.com",
		fullName: "حسن رضایی",
		id: 15,
		role: "2",
	},
];

export const useTableHandlers = () => {
	// Get state from store
	const tableData = useUsersStore((state) => state.tableData);
	const currentPage = useUsersStore((state) => state.currentPage);
	const totalItems = useUsersStore((state) => state.totalItems);
	const isLoading = useUsersStore((state) => state.isLoading);

	// Get actions from store
	const setTableData = useUsersStore((state) => state.setTableData);
	const setTableLoading = useUsersStore((state) => state.setTableLoading);
	const setCurrentPage = useUsersStore((state) => state.setCurrentPage);
	const setFilters = useUsersStore((state) => state.setFilters);
	const setSort = useUsersStore((state) => state.setSort);
	const setSelectedIds = useUsersStore((state) => state.setSelectedIds);
	const openForm = useUsersStore((state) => state.openForm);

	// Load initial data
	useEffect(() => {
		if (tableData.length === 0 && isLoading) {
			const loadData = async () => {
				setTableLoading(true);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setTableData(MOCK_USERS);
			};
			loadData();
		}
	}, [tableData.length, isLoading, setTableData, setTableLoading]);

	// Handlers
	const handleFilterChange = useCallback(
		(newFilters: Record<string, FilterValue>): void => {
			console.log("🎯 Filter Change:", newFilters);
			setFilters(newFilters);
		},
		[setFilters],
	);

	const handleSortChange = useCallback(
		(field: string | null, order: "asc" | "desc" | null): void => {
			console.log("📊 Sort Change:", { field, order });
			setSort(field, order);
		},
		[setSort],
	);

	const handlePageChange = useCallback(
		(page: number): void => {
			console.log("📄 Page Change:", page);
			setCurrentPage(page);
		},
		[setCurrentPage],
	);

	const handleEdit = useCallback(
		(row: TableRow): void => {
			console.log("✏️ Edit row:", row);
			openForm("edit", row as Record<string, string>);
		},
		[openForm],
	);

	const handleView = useCallback(
		(row: TableRow): void => {
			console.log("👁️ View row:", row);
			openForm("view", row as Record<string, string>);
		},
		[openForm],
	);

	const handleSelectionChange = useCallback(
		(ids: number[]): void => {
			console.log("✅ Selected IDs:", ids);
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
