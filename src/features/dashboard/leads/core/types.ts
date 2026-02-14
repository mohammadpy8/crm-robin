// src/features/dashboard/leads/core/types.ts
import type { FilterValue } from "@/features/shared/ui/table";

export interface LeadFormData {
  [key: string]: string | undefined;
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  status?: string;
  source?: string;
  priority?: string;
  company?: string;
  address?: string;
  note?: string;
  website?: string;
  assignTo?: string;
}

export interface LeadFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: LeadFormData;
  onSubmit: (data: LeadFormData) => void | Promise<void>;
}

export type FormMode = "create" | "edit" | "view";

export interface LeadData {
  id: number;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  status: string;
  source?: string;
  priority?: string;
  company?: string;
  address?: string;
  note?: string;
  website?: string;
  assignedToUserId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeadsState {
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
