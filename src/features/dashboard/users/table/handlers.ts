import type { TableRow } from "@/features/shared/ui/table";
import { createTableHandlers } from "@/features/shared/ui/table/hooks/useTableHandlers";
import { useUsersQuery } from "../api";
import { useUsersStore } from "../store";

export const useTableHandlers = createTableHandlers<TableRow>({
	useQuery: useUsersQuery,
	useStore: useUsersStore,
});
