import type { FilterValue } from "@/features/shared/ui/table";
import { positionLabels } from "./../configs/table.config";
import { ContactPosition } from "@/api/types";

export interface ContactFormData {
  [key: string]: string | undefined;
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  status?: string;
  email?: string;
  companyId?: string;
  position?: ContactPosition;
  note?: string;
}

export interface ContactTableRow {
  [key: string]: string | number | undefined;
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  position: ContactPosition;
  email: string;
  createdAt: string;
  assignedToUserId: string;
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
