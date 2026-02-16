"use client";

import type { TableRow } from "@/features/shared/ui/table";
import { TableBuilder } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { useUserStore } from "@/store/useUserStore.";
import { getContactsColumnConfig } from "../configs/table.config";
import { useContactsQuery } from "../core/api";
import { useContactsStore } from "../core/store";
import { ITEMS_PER_PAGE } from "../core/utils";

const useContactsTable = createTableHandlers<TableRow>({
  useQuery: useContactsQuery,
  useStore: useContactsStore,
});

export function ContactsTable() {
  const { users } = useUserStore();
  const { state, handlers } = useContactsTable();
  const totalItems = useContactsStore((store) => store.totalItems);
  const selectedIds = useContactsStore((store) => store.selectedIds);

  const columns = getContactsColumnConfig(users);

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