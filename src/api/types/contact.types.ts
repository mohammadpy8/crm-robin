export enum ContactPosition {
  OWNER = "owner",
  MANAGER = "manager",
  ACCOUNTANT = "accountant",
  SECRETARY = "secretary",
  EMPLOYEE = "employee",
  OTHER = "other",
}

export interface CreateContactDto {
  firstName?: string;
  lastName: string;
  email?: string;
  phone: string;
  position?: ContactPosition;
  note?: string;
  companyId?: number;
  assignedToUserId?: number;
}
export interface UpdateContactDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  position?: ContactPosition;
  note?: string;
  companyId?: number;
  assignedToUserId?: number;
}
export interface AssignContactDto {
  assignedToUserId: number;
}
export interface BulkAssignContactsDto {
  contactIds: number[];
  assignedToUserId: number;
}
export interface BulkDeleteContactsDto {
  contactIds: number[];
}

export interface ContactEntity {
  id: number;
  firstName?: string;
  lastName: string;
  email?: string;
  phone: string;
  position?: ContactPosition;
  note?: string;
  companyId?: number;
  assignedToUserId?: number;
  assignedByUserId?: number;
  assignedAt?: string;
  createdAt: string;
  updatedAt: string;
  company?: {
    id: number;
    name: string;
  };
  assignedToUser?: {
    id: number;
    fullName: string;
  };
  assignedByUser?: {
    id: number;
    fullName: string;
  };
}
export interface ContactQueryParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyId?: number;
  position?: ContactPosition;
  assignedToUserId?: number;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: string;
}

export interface PaginatedContactsResponse {
  data: ContactEntity[];
  total: number;
  page: number;
  limit: number;
}

export interface BulkOperationResponse {
  message: string;
}

export interface ImportContactsResponse {
  message: string;
  imported?: number;
  failed?: number;
  errors?: Array<{
    row: number;
    error: string;
  }>;
}

export interface ContactListItem {
  id: number;
  firstName?: string;
  lastName: string;
  phone: string;
  email?: string;
}
