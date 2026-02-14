"use client";

import { TableBuilder } from "@/features/shared/ui/table";
import type { TableRow } from "@/features/shared/ui/table";
import { useRoleStore } from "@/store/useRoleStore";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { useUsersStore } from "../core/store";
import { useUsersQuery } from "../core/api";
import { getUsersColumnConfig } from "../configs/table.config";

const ITEMS_PER_PAGE = 10;


const useUsersTable = createTableHandlers<TableRow>({
  useQuery: useUsersQuery,
  useStore: useUsersStore,
});


export function UsersTable() {
  const { roles } = useRoleStore();
  const { state, handlers } = useUsersTable();

  const columnConfig = getUsersColumnConfig(roles);

  return (
    <TableBuilder
      columns={columnConfig}
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
