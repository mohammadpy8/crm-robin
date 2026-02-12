import type { FilterValue } from "@/features/shared/ui/table";

export type FormMode = "create" | "edit" | "view";

export interface UserData {
	id: number;
	fullName: string;
	email: string;
	role: string;
	createdAt: string;
}

export interface UsersState {
	tableData: UserData[];
	currentPage: number;
	totalItems: number;
	isLoading: boolean;

	filters: Record<string, FilterValue>;
	sortField: string | null;
	sortOrder: "asc" | "desc" | null;

	selectedIds: number[];

	isFormOpen: boolean;
	formMode: FormMode | null;
	formInitialValues: Record<string, string> | null;

	selectedFilter: string;
}
