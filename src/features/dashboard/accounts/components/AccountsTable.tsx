"use client";

import { TableBuilder } from "@/features/shared/ui/table";
import type { TableRow } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { useAccountsQuery } from "../core/api";
import { useAccountsStore } from "../core/store";
import { getAccountsColumnConfig } from "../configs/table.config";

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
      data={state.data}
      loading={state.isFetching}
      currentPage={state.currentPage}
      itemsPerPage={ITEMS_PER_PAGE}
      totalItems={state.totalItems}
      multiSelect={false}
      onPageChange={handlers.onPageChange}
      onFilterChange={handlers.onFilterChange}
      onSortChange={handlers.onSortChange}
      onSelectionChange={handlers.onSelectionChange}
      onRowEdit={handlers.onEdit}
      onRowView={handlers.onView}
    />
  );
}
