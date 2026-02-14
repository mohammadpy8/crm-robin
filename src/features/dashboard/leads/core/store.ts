//store// src/features/dashboard/leads/core/store.ts
import { create } from "zustand";
import type { FilterValue } from "@/features/shared/ui/table";
import type { FormMode, LeadsState } from "./types";

interface LeadsStore extends LeadsState {
  setCurrentPage: (page: number) => void;
  setFilters: (filters: Record<string, FilterValue>) => void;
  setSort: (field: string | null, order: "asc" | "desc" | null) => void;
  setSelectedIds: (ids: number[]) => void;
  openForm: (mode: FormMode, data?: Record<string, string>) => void;
  closeForm: () => void;
  setToolbarFilter: (filter: string) => void;
}

const initialState: LeadsState = {
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

export const useLeadsStore = create<LeadsStore>((set) => ({
  ...initialState,

  setCurrentPage: (page) => set({ currentPage: page }),

  setFilters: (filters) => set({ currentPage: 1, filters }),
  setSort: (field, order) => set({ sortField: field, sortOrder: order }),

  setSelectedIds: (ids) => set({ selectedIds: ids }),

  openForm: (mode, data) =>
    set({
      formMode: mode,
      formInitialValues: data || null,
      isFormOpen: true,
    }),

  closeForm: () =>
    set({
      formMode: null,
      formInitialValues: null,
      isFormOpen: false,
    }),

  setToolbarFilter: (filter) => set({ selectedFilter: filter }),
}));
