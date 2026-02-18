import { create } from "zustand";
import type { FilterValue } from "@/features/shared/ui/table";
import type { FormMode, LeadsState } from "./types";

interface LeadsStore extends LeadsState {
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

	queryParams: {
		limit: Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE),
		page: 1,
	},

	resetAll: () =>
		set({
			...initialState,
			queryParams: {
				limit: Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE),
				page: 1,
			},
			totalItems: 0,
		}),

	resetSelection: () =>
		set({
			formInitialValues: null,
			formMode: null,
			isFormOpen: false,
			selectedIds: [],
		}),

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
				filters: Object.keys(filters).length > 0 ? filters : undefined,
				page: 1,
			},
		})),

	setSelectedIds: (ids) => set({ selectedIds: ids }),

	setSort: (field, order) =>
		set((state) => ({
			queryParams: {
				...state.queryParams,
				sortField: field,
				sortOrder: order,
			},
			sortField: field,
			sortOrder: order,
		})),

	setToolbarFilter: (filter) => set({ selectedFilter: filter }),

	setTotalItems: (total) => set({ totalItems: total }),

	totalItems: 0,
}));
