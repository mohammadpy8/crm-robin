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
	formInitialValues: null,
	formMode: null,
	isFormOpen: false,
	selectedFilter: "all",
	selectedIds: [],
	sortField: null,
	sortOrder: null,
};

export const useContactsStore = create<ContactsStore>((set) => ({
	...initialState,
	closeForm: () => set({ formInitialValues: null, formMode: null, isFormOpen: false }),
	openForm: (mode, data) =>
		set({ formInitialValues: data || null, formMode: mode, isFormOpen: true }),
	setCurrentPage: (page) => set({ currentPage: page }),
	setFilters: (filters) => set({ currentPage: 1, filters }),
	setSelectedIds: (ids) => set({ selectedIds: ids }),
	setSort: (field, order) => set({ sortField: field, sortOrder: order }),
	setToolbarFilter: (filter) => set({ selectedFilter: filter }),
}));
