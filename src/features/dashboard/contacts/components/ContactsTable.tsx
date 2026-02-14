"use client";

import { TableBuilder } from "@/features/shared/ui/table";
import type { TableRow } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { useContactsQuery } from "../core/api";
import { useContactsStore } from "../core/store";
import { getContactsColumnConfig } from "../configs/table.config";

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
