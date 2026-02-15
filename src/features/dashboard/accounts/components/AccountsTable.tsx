"use client";

import { useEffect, useMemo } from "react";
import type { TableRow } from "@/features/shared/ui/table";
import { TableBuilder } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { useUserStore } from "@/store/useUserStore.";
import { getAccountsColumnConfig } from "../configs/table.config";
import { useAccountsQuery } from "../core/api";
import { useAccountsStore } from "../core/store";

const ITEMS_PER_PAGE = 3;

const useAccountsTable = createTableHandlers<TableRow>({
	useQuery: useAccountsQuery,
	useStore: useAccountsStore,
});

export function AccountsTable() {
	const { users, fetchUsers } = useUserStore();
	const { state, handlers } = useAccountsTable();
	const totalItems = useAccountsStore((store) => store.totalItems);
	const selectedIds = useAccountsStore((store) => store.selectedIds);

	console.log(" total items", totalItems, "is fetch:", state.isFetching);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const data = useMemo(() => {
		if (!state.data) {
			return [];
		}

		return state.data.map((row) => ({
			...row,
			assignedToUserId: row.assignedToUserId
				? users.find((u) => u.value === row.assignedToUserId)?.label || "-"
				: "-",
		}));
	}, [state.data, users]);

	const columns = getAccountsColumnConfig(users);

	return (
		<TableBuilder
			columns={columns}
			currentPage={state.currentPage}
			data={data}
			externalSelectedIds={selectedIds}
			itemsPerPage={ITEMS_PER_PAGE}
			loading={state.isFetching}
			multiSelect={true}
			onFilterChange={handlers.onFilterChange}
			onPageChange={handlers.onPageChange}
			onRowEdit={handlers.onEdit}
			onRowView={handlers.onView}
			onSelectionChange={handlers.onSelectionChange}
			onSortChange={handlers.onSortChange}
			totalItems={totalItems}
		/>
	);
}
