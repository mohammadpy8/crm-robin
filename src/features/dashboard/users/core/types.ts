import type { FilterValue } from "@/features/shared/ui/table";

export interface UserFormData {
	[key: string]: string | undefined;
	id: string;
	fullName?: string;
	mobile?: string;
	password?: string;
	email?: string;
	role?: string;
}

export interface UserFormContainerProps {
	isOpen: boolean;
	onClose: () => void;
	initialValues?: UserFormData;
	onSubmit: (data: UserFormData) => void | Promise<void>;
}

export type FormMode = "create" | "edit" | "view";

export interface UserData {
	id: number;
	fullName: string;
	email: string;
	role: string;
	createdAt: string;
}

export interface UsersState {
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
