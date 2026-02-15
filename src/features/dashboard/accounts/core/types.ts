import type { FilterValue } from "@/features/shared/ui/table";

export enum CompanyStatus {
  ACTIVE = "active",
  PASSIVE = "passive",
  SUSPENSION = "suspension",
}

export enum CompanyLevel {
  GOLD = "gold",
  SILVER = "silver",
  BRONZE = "bronze",
}

export interface AccountFormData {
  [key: string]: string | undefined;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: CompanyStatus;
  level?: CompanyLevel;
  nationalId?: string;
  assignedToUserId?: string;
  address?: string;
  note?: string;
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
