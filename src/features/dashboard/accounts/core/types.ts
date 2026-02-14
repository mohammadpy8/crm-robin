import type { FilterValue } from "@/features/shared/ui/table";

export interface AccountFormData {
  [key: string]: string | undefined;
  id?: string;
  organName?: string;
  email?: string;
  mobile?: string;
  status?: string;
  serviceLevel?: string;
  nationalId?: string;
  referredBy?: string;
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
