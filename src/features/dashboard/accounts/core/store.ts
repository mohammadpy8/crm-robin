import { create } from "zustand";
import type { FilterValue } from "@/features/shared/ui/table";
import type { AccountsState, FormMode } from "./types";

interface AccountsStore extends AccountsState {
  setCurrentPage: (page: number) => void;
  setFilters: (filters: Record<string, FilterValue>) => void;
  setSort: (field: string | null, order: "asc" | "desc" | null) => void;
  setSelectedIds: (ids: number[]) => void;
  openForm: (mode: FormMode, data?: Record<string, string>) => void;
  closeForm: () => void;
  setToolbarFilter: (filter: string) => void;
}

const initialState: AccountsState = {
  currentPage: 1,
  filters: {},
  sortField: null,
  sortOrder: null,
  selectedIds: [],
  isFormOpen: false,
  formMode: null,
  formInitialValues: null,
  selectedFilter: "all",
};

export const useAccountsStore = create<AccountsStore>((set) => ({
  ...initialState,
  setCurrentPage: (page) => set({ currentPage: page }),
  setFilters: (filters) => set({ filters, currentPage: 1 }),
  setSort: (field, order) => set({ sortField: field, sortOrder: order }),
  setSelectedIds: (ids) => set({ selectedIds: ids }),
  openForm: (mode, data) => set({ isFormOpen: true, formMode: mode, formInitialValues: data || null }),
  closeForm: () => set({ isFormOpen: false, formMode: null, formInitialValues: null }),
  setToolbarFilter: (filter) => set({ selectedFilter: filter }),
}));
