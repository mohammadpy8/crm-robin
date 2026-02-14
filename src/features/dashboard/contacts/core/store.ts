import { create } from "zustand";
import type { FilterValue } from "@/features/shared/ui/table";
import type { ContactsState, FormMode } from "./types";

interface ContactsStore extends ContactsState {
  setCurrentPage: (page: number) => void;
  setFilters: (filters: Record<string, FilterValue>) => void;
  setSort: (field: string | null, order: "asc" | "desc" | null) => void;
  setSelectedIds: (ids: number[]) => void;
  openForm: (mode: FormMode, data?: Record<string, string>) => void;
  closeForm: () => void;
  setToolbarFilter: (filter: string) => void;
}

const initialState: ContactsState = {
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

export const useContactsStore = create<ContactsStore>((set) => ({
  ...initialState,
  setCurrentPage: (page) => set({ currentPage: page }),
  setFilters: (filters) => set({ filters, currentPage: 1 }),
  setSort: (field, order) => set({ sortField: field, sortOrder: order }),
  setSelectedIds: (ids) => set({ selectedIds: ids }),
  openForm: (mode, data) => set({ isFormOpen: true, formMode: mode, formInitialValues: data || null }),
  closeForm: () => set({ isFormOpen: false, formMode: null, formInitialValues: null }),
  setToolbarFilter: (filter) => set({ selectedFilter: filter }),
}));
