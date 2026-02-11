// features/dashboard/users/table/Container.tsx
"use client";

import { useState } from "react";
import type { TableRow } from "@/features/shared/ui/table";
import { TableBuilder } from "@/features/shared/ui/table";
import { useRoleStore } from "@/store/useRoleStore";
import { getUsersColumnConfig } from "./config";
import { useTableHandlers } from "./handlers";

// 🧪 Mock Data برای تست
const MOCK_USERS: TableRow[] = [
	{
		createdAt: "1403/10/15",
		email: "ali@example.com",
		fullName: "علی احمدی",
		id: 1,
		role: "1",
		status: "active",
	},
	{
		createdAt: "1403/09/20",
		email: "sara@example.com",
		fullName: "سارا محمدی",
		id: 2,
		role: "2",
		status: "active",
	},
	{
		createdAt: "1403/08/10",
		email: "reza@example.com",
		fullName: "رضا کریمی",
		id: 3,
		role: "3",
		status: "inactive",
	},
	{
		createdAt: "1403/11/01",
		email: "maryam@example.com",
		fullName: "مریم حسینی",
		id: 4,
		role: "1",
		status: "active",
	},
	{
		createdAt: "1403/10/25",
		email: "hossein@example.com",
		fullName: "حسین رضایی",
		id: 5,
		role: "2",
		status: "active",
	},
	{
		createdAt: "1403/10/15",
		email: "ali@example.com",
		fullName: "علی احمدی",
		id: 1,
		role: "1",
		status: "active",
	},
	{
		createdAt: "1403/09/20",
		email: "sara@example.com",
		fullName: "سارا محمدی",
		id: 2,
		role: "2",
		status: "active",
	},
	{
		createdAt: "1403/08/10",
		email: "reza@example.com",
		fullName: "رضا کریمی",
		id: 3,
		role: "3",
		status: "inactive",
	},
	{
		createdAt: "1403/11/01",
		email: "maryam@example.com",
		fullName: "مریم حسینی",
		id: 4,
		role: "1",
		status: "active",
	},
	{
		createdAt: "1403/10/25",
		email: "hossein@example.com",
		fullName: "حسین رضایی",
		id: 5,
		role: "2",
		status: "active",
	},
	{
		createdAt: "1403/10/15",
		email: "ali@example.com",
		fullName: "علی احمدی",
		id: 1,
		role: "1",
		status: "active",
	},
	{
		createdAt: "1403/09/20",
		email: "sara@example.com",
		fullName: "سارا محمدی",
		id: 2,
		role: "2",
		status: "active",
	},
	{
		createdAt: "1403/08/10",
		email: "reza@example.com",
		fullName: "رضا کریمی",
		id: 3,
		role: "3",
		status: "inactive",
	},
	{
		createdAt: "1403/11/01",
		email: "maryam@example.com",
		fullName: "مریم حسینی",
		id: 4,
		role: "1",
		status: "active",
	},
	{
		createdAt: "1403/10/25",
		email: "hossein@example.com",
		fullName: "حسین رضایی",
		id: 5,
		role: "2",
		status: "active",
	},
];

export default function UsersTableContainer() {
	// 🔄 Loading State (برای شبیه‌سازی API Call)
	const [loading, setLoading] = useState(true);
	const [tableData] = useState<TableRow[]>(MOCK_USERS);

	const {
		currentPage,
		handleEdit,
		handleFilterChange,
		handlePageChange,
		handleSelectionChange,
		handleSortChange,
		handleView,
	} = useTableHandlers();

	const { roles } = useRoleStore();

	const roleOptions = roles;
	const columnConfig = getUsersColumnConfig(roleOptions);

	const itemsPerPage = 10;
	const totalItems = tableData.length;

	return (
		<TableBuilder
			columns={columnConfig}
			currentPage={currentPage}
			data={tableData}
			itemsPerPage={itemsPerPage}
			loading={loading}
			multiSelect={false}
			onFilterChange={handleFilterChange}
			onPageChange={handlePageChange}
			onRowEdit={handleEdit}
			onRowView={handleView}
			onSelectionChange={handleSelectionChange}
			onSortChange={handleSortChange}
			totalItems={totalItems}
		/>
	);
}
