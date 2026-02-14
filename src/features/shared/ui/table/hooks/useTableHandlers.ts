import { useCallback } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { FilterValue, TableRow } from "@/features/shared/ui/table";

interface CrudStoreState {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setFilters: (filters: Record<string, FilterValue>) => void;
  setSort: (field: string | null, order: "asc" | "desc" | null) => void;
  setSelectedIds: (ids: number[]) => void;
  openForm: (mode: "edit" | "view", row: Record<string, string>) => void;
}

interface TableHandlersConfig<T> {
  useQuery: () => UseQueryResult<T[], Error>; // ✅ تغییر اصلی اینجاست
  useStore: <S>(selector: (state: CrudStoreState) => S) => S;
}

export const createTableHandlers = <T extends TableRow = TableRow>(config: TableHandlersConfig<T>) => {
  return () => {
    const queryResult = config.useQuery();
    const { data = [], isLoading, isFetching, isError } = queryResult;

    const currentPage = config.useStore((state) => state.currentPage);
    const setCurrentPage = config.useStore((state) => state.setCurrentPage);
    const setFilters = config.useStore((state) => state.setFilters);
    const setSort = config.useStore((state) => state.setSort);
    const setSelectedIds = config.useStore((state) => state.setSelectedIds);
    const openForm = config.useStore((state) => state.openForm);

    const handleFilterChange = useCallback(
      (newFilters: Record<string, FilterValue>): void => {
        setFilters(newFilters);
      },
      [setFilters],
    );

    const handleSortChange = useCallback(
      (field: string | null, order: "asc" | "desc" | null): void => {
        setSort(field, order);
      },
      [setSort],
    );

    const handlePageChange = useCallback(
      (page: number): void => {
        setCurrentPage(page);
      },
      [setCurrentPage],
    );

    const handleEdit = useCallback(
      (row: TableRow): void => {
        openForm("edit", row as Record<string, string>);
      },
      [openForm],
    );

    const handleView = useCallback(
      (row: TableRow): void => {
        openForm("view", row as Record<string, string>);
      },
      [openForm],
    );

    const handleSelectionChange = useCallback(
      (ids: number[]): void => {
        setSelectedIds(ids);
      },
      [setSelectedIds],
    );

    return {
      handlers: {
        onEdit: handleEdit,
        onFilterChange: handleFilterChange,
        onPageChange: handlePageChange,
        onSelectionChange: handleSelectionChange,
        onSortChange: handleSortChange,
        onView: handleView,
      },
      state: {
        currentPage,
        data,
        isError,
        isFetching,
        isLoading,
        totalItems: data.length,
      },
    };
  };
};
