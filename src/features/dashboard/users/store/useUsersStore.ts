import { create } from "zustand";
import type { FilterValue } from "@/features/shared/ui/table";
import type { FormMode, UserData, UsersState } from "../types/";

interface UsersStore extends UsersState {
	// Table Actions
	setTableData: (data: UserData[]) => void;
	setTableLoading: (isLoading: boolean) => void;
	setCurrentPage: (page: number) => void;

	// Filter Actions
	setFilters: (filters: Record<string, FilterValue>) => void;
	setSort: (field: string | null, order: "asc" | "desc" | null) => void;

	// Selection Actions
	setSelectedIds: (ids: number[]) => void;

	// Form Actions
	openForm: (mode: FormMode, data?: Record<string, string>) => void;
	closeForm: () => void;

	// Toolbar Actions
	setToolbarFilter: (filter: string) => void;
}

const initialState: UsersState = {
	currentPage: 1,
	filters: {},
	formInitialValues: null,
	formMode: null,
	isFormOpen: false,
	isLoading: true,
	selectedFilter: "all",
	selectedIds: [],
	sortField: null,
	sortOrder: null,
	tableData: [],
	totalItems: 0,
};

export const useUsersStore = create<UsersStore>((set) => ({
	...initialState,

	closeForm: () =>
		set({
			formInitialValues: null,
			formMode: null,
			isFormOpen: false,
		}),

	// Form Actions
	openForm: (mode, data) =>
		set({
			formInitialValues: data || null,
			formMode: mode,
			isFormOpen: true,
		}),

	setCurrentPage: (page) => set({ currentPage: page }),

	// Filter Actions
	setFilters: (filters) =>
		set({
			currentPage: 1,
			filters,
		}),

	// Selection Actions
	setSelectedIds: (ids) => set({ selectedIds: ids }),

	setSort: (field, order) =>
		set({
			sortField: field,
			sortOrder: order,
		}),

	// Table Actions
	setTableData: (data) =>
		set({
			isLoading: false,
			tableData: data,
			totalItems: data.length,
		}),

	setTableLoading: (isLoading) => set({ isLoading }),

	// Toolbar Actions
	setToolbarFilter: (filter) => set({ selectedFilter: filter }),
}));
