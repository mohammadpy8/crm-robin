"use client";

import { TableBuilder } from "@/features/shared/ui/table";
import { useRoleStore } from "@/store/useRoleStore";
import { getUsersColumnConfig } from "./config";
import { useTableHandlers } from "./handlers";

const ITEMS_PER_PAGE = 10;

export default function UsersTableContainer() {
	const { roles } = useRoleStore();
	const { state, handlers } = useTableHandlers();

	const columnConfig = getUsersColumnConfig(roles);

	return (
		<TableBuilder
			columns={columnConfig}
			currentPage={state.currentPage}
			data={state.data}
			itemsPerPage={ITEMS_PER_PAGE}
			loading={state.isLoading}
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
