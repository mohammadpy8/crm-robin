import { create } from "zustand";
import type { FilterValue, TableRow } from "@/features/shared/ui/table";
import type { FormMode, UsersState } from "../types/";

interface UsersStore extends UsersState {
	setTableData: (data: TableRow[]) => void;
	setTableLoading: (isLoading: boolean) => void;
	setCurrentPage: (page: number) => void;

	setFilters: (filters: Record<string, FilterValue>) => void;
	setSort: (field: string | null, order: "asc" | "desc" | null) => void;

	setSelectedIds: (ids: number[]) => void;

	openForm: (mode: FormMode, data?: Record<string, string>) => void;
	closeForm: () => void;

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

	openForm: (mode, data) =>
		set({
			formInitialValues: data || null,
			formMode: mode,
			isFormOpen: true,
		}),

	setCurrentPage: (page) => set({ currentPage: page }),

	setFilters: (filters) =>
		set({
			currentPage: 1,
			filters,
		}),

	setSelectedIds: (ids) => set({ selectedIds: ids }),

	setSort: (field, order) =>
		set({
			sortField: field,
			sortOrder: order,
		}),

	setTableData: (data) =>
		set({
			isLoading: false,
			tableData: data,
			totalItems: data.length,
		}),

	setTableLoading: (isLoading) => set({ isLoading }),

	setToolbarFilter: (filter) => set({ selectedFilter: filter }),
}));
