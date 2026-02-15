import { create } from "zustand";
import type { FilterValue } from "@/features/shared/ui/table";
import type { AccountsState, FormMode } from "./types";

interface AccountsStore extends AccountsState {
  queryParams: {
    page: number;
    limit: number;
    filters?: Record<string, FilterValue>;
    sortField?: string | null;
    sortOrder?: "asc" | "desc" | null;
  };
  setCurrentPage: (page: number) => void;
  setFilters: (filters: Record<string, FilterValue>) => void;
  setSort: (field: string | null, order: "asc" | "desc" | null) => void;
  setSelectedIds: (ids: number[]) => void;
  openForm: (mode: FormMode, data?: Record<string, string>) => void;
  closeForm: () => void;
  setToolbarFilter: (filter: string) => void;
}

const ITEMS_PER_PAGE = 10;

const initialState: AccountsState = {
  currentPage: 1,
  filters: {},
  formInitialValues: null,
  formMode: null,
  isFormOpen: false,
  selectedFilter: "all",
  selectedIds: [],
  sortField: null,
  sortOrder: null,
};

export const useAccountsStore = create<AccountsStore>((set) => ({
  ...initialState,

  queryParams: {
    page: 1,
    limit: ITEMS_PER_PAGE,
  },

  closeForm: () => set({ formInitialValues: null, formMode: null, isFormOpen: false }),

  openForm: (mode, data) => set({ formInitialValues: data || null, formMode: mode, isFormOpen: true }),

  setCurrentPage: (page) =>
    set((state) => ({
      currentPage: page,
      queryParams: {
        ...state.queryParams,
        page,
      },
    })),

  setFilters: (filters) =>
    set((state) => ({
      currentPage: 1,
      filters,
      queryParams: {
        ...state.queryParams,
        page: 1,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
      },
    })),

  setSelectedIds: (ids) => set({ selectedIds: ids }),

  setSort: (field, order) =>
    set((state) => ({
      sortField: field,
      sortOrder: order,
      queryParams: {
        ...state.queryParams,
        sortField: field,
        sortOrder: order,
      },
    })),

  setToolbarFilter: (filter) => set({ selectedFilter: filter }),
}));
