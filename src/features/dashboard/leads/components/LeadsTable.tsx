"use client";

import type { TableRow } from "@/features/shared/ui/table";
import { TableBuilder } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { getLeadsColumnConfig } from "../configs/table.config";
import { useLeadsQuery } from "../core/api";
import { useLeadsStore } from "../core/store";

const ITEMS_PER_PAGE = 10;

const useLeadsTable = createTableHandlers<TableRow>({
	useQuery: useLeadsQuery,
	useStore: useLeadsStore,
});

export function LeadsTable() {
	const { state, handlers } = useLeadsTable();
	const columnConfig = getLeadsColumnConfig();

	return (
		<TableBuilder
			columns={columnConfig}
			currentPage={state.currentPage}
			data={state.data}
			itemsPerPage={ITEMS_PER_PAGE}
			loading={state.isFetching}
			multiSelect={true}
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
