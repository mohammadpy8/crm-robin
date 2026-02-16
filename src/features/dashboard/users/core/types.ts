import type { FilterValue } from "@/features/shared/ui/table";

export interface UserFormData {
  [key: string]: string | undefined;
  id?: string;
  fullName?: string;
  mobile?: string;
  password?: string;
  email?: string;
  role?: string;
}

export interface UserTableRow {
  [key: string]: string | number | undefined;
  id: number;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface UpdateUserPayload {
  data?: {
    email?: string;
    fullName?: string;
    phoneNumber?: string;
  };
  roleId?: number;
  password?: string;
}

export type FormMode = "create" | "edit" | "view";

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