import { create } from "zustand";
import type { FilterValue } from "@/features/shared/ui/table";
import type { AccountsState, FormMode } from "./types";
import { ITEMS_PER_PAGE } from "./utils";

interface AccountsStore extends AccountsState {
  queryParams: {
    page: number;
    limit: number;
    filters?: Record<string, FilterValue>;
    sortField?: string | null;
    sortOrder?: "asc" | "desc" | null;
  };
  totalItems: number;
  setTotalItems: (total: number) => void;
  setCurrentPage: (page: number) => void;
  setFilters: (filters: Record<string, FilterValue>) => void;
  setSort: (field: string | null, order: "asc" | "desc" | null) => void;
  setSelectedIds: (ids: number[]) => void;
  openForm: (mode: FormMode, data?: Record<string, string>) => void;
  closeForm: () => void;
  setToolbarFilter: (filter: string) => void;
  resetSelection: () => void;
  resetAll: () => void;
}

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

  totalItems: 0,

  setTotalItems: (total) => set({ totalItems: total }),

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

  setSelectedIds: (ids) => set({ selectedIds: ids }),

  openForm: (mode, data) =>
    set({
      isFormOpen: true,
      formMode: mode,
      formInitialValues: data || null,
    }),

  closeForm: () =>
    set({
      isFormOpen: false,
      formMode: null,
      formInitialValues: null,
    }),

  setToolbarFilter: (filter) => set({ selectedFilter: filter }),

  resetSelection: () =>
    set({
      selectedIds: [],
      isFormOpen: false,
      formMode: null,
      formInitialValues: null,
    }),

  resetAll: () =>
    set({
      ...initialState,
      queryParams: {
        page: 1,
        limit: ITEMS_PER_PAGE,
      },
      totalItems: 0,
    }),
}));
