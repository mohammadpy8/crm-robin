import type { FilterValue } from "@/features/shared/ui/table";

export interface ContactFormData {
	[key: string]: string | undefined;
	id?: string;
	organName?: string;
	lastName?: string;
	mobile?: string;
	status?: string;
	email?: string;
	companyName?: string;
	note?: string;
}

export type FormMode = "create" | "edit" | "view";

export interface ContactsState {
	currentPage: number;
	filters: Record<string, FilterValue>;
	sortField: string | null;
	sortOrder: "asc" | "desc" | null;
	selectedIds: number[];
	isFormOpen: boolean;
	formMode: FormMode | null;
	formInitialValues: Record<string, string> | null;
	selectedFilter: string;
}
