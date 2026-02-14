"use client";

import type { TableRow } from "@/features/shared/ui/table";
import { TableBuilder } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { getAccountsColumnConfig } from "../configs/table.config";
import { useAccountsQuery } from "../core/api";
import { useAccountsStore } from "../core/store";

const ITEMS_PER_PAGE = 10;

const useAccountsTable = createTableHandlers<TableRow>({
	useQuery: useAccountsQuery,
	useStore: useAccountsStore,
});

export function AccountsTable() {
	const { state, handlers } = useAccountsTable();

	return (
		<TableBuilder
			columns={getAccountsColumnConfig()}
			currentPage={state.currentPage}
			data={state.data}
			itemsPerPage={ITEMS_PER_PAGE}
			loading={state.isFetching}
			multiSelect={false}
			onFilterChange={handlers.onFilterChange}
			onPageChange={handlers.onPageChange}
			onRowEdit={handlers.onEdit}
			onRowView={handlers.onView}
			onSelectionChange={handlers.onSelectionChange}
			onSortChange={handlers.onSortChange}
			totalItems={state.totalItems}
		/>
	);
}
