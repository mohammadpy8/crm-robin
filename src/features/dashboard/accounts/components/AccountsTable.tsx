"use client";

import { useEffect } from "react";
import type { TableRow } from "@/features/shared/ui/table";
import { TableBuilder } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { getAccountsColumnConfig } from "../configs/table.config";
import { useAccountsQuery } from "../core/api";
import { useAccountsStore } from "../core/store";
import { useUserStore } from "@/store/useUserStore.";


const ITEMS_PER_PAGE = 10;

const useAccountsTable = createTableHandlers<TableRow>({
  useQuery: useAccountsQuery,
  useStore: useAccountsStore,
});

export function AccountsTable() {
  const { users, fetchUsers } = useUserStore();
  const { state, handlers } = useAccountsTable();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = getAccountsColumnConfig(users);

  return (
    <TableBuilder
      columns={columns}
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
