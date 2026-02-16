"use client";

import type { TableRow } from "@/features/shared/ui/table";
import { TableBuilder } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { useUserStore } from "@/store/useUserStore.";
import { getLeadsColumnConfig } from "../configs/table.config";
import { useLeadsQuery } from "../core/api";
import { useLeadsStore } from "../core/store";
import { ITEMS_PER_PAGE } from "../core/utils";

const useLeadsTable = createTableHandlers<TableRow>({
  useQuery: useLeadsQuery,
  useStore: useLeadsStore,
});

export function LeadsTable() {
  const { users = [] } = useUserStore();
  const { state, handlers } = useLeadsTable();
  const totalItems = useLeadsStore((store) => store.totalItems);
  const selectedIds = useLeadsStore((store) => store.selectedIds);

  const columns = getLeadsColumnConfig(users);

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
