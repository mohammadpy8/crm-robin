"use client";

import type { TableRow } from "@/features/shared/ui/table";
import { TableBuilder } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { getContactsColumnConfig } from "../configs/table.config";
import { useContactsQuery } from "../core/api";
import { useContactsStore } from "../core/store";

const ITEMS_PER_PAGE = 10;

const useContactsTable = createTableHandlers<TableRow>({
	useQuery: useContactsQuery,
	useStore: useContactsStore,
});

export function ContactsTable() {
	const { state, handlers } = useContactsTable();

	return (
		<TableBuilder
			columns={getContactsColumnConfig()}
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
