"use client";

import type { TableRow } from "@/features/shared/ui/table";
import { TableBuilder } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { useRoleStore } from "@/store/useRoleStore";
import { getUsersColumnConfig } from "../configs/table.config";
import { useUsersQuery } from "../core/api";
import { useUsersStore } from "../core/store";
import { ITEMS_PER_PAGE } from "../core/utils";

const useUsersTable = createTableHandlers<TableRow>({
  useQuery: useUsersQuery,
  useStore: useUsersStore,
});

export function UsersTable() {
  const { roles = [] } = useRoleStore();
  const { state, handlers } = useUsersTable();
  const totalItems = useUsersStore((store) => store.totalItems);
  const selectedIds = useUsersStore((store) => store.selectedIds);

  const columns = getUsersColumnConfig(roles);

  return (
    <TableBuilder
      columns={columns}
      currentPage={state.currentPage}
      data={state.data}
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