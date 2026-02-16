import type { CompanyLevel, CompanyStatus } from "@/api/types";
import type { FilterValue } from "@/features/shared/ui/table";

export type { CompanyLevel, CompanyStatus } from "@/api/types";

export interface AccountFormData {
  [key: string]: string | number | undefined | CompanyStatus | CompanyLevel;
  name: string;
  email?: string;
  phone: string;
  status?: CompanyStatus;
  level?: CompanyLevel;
  nationalId?: string;
  assignedToUserId?: string;
  address?: string;
  note?: string;
}

export interface AccountTableRow {
  [key: string]: string | number | undefined;
  id: number;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  status: string;
  level: string;
  assignedToUserId: string;
  createdAt: string;
}

export type FormMode = "create" | "edit" | "view";

export interface AccountsState {
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
