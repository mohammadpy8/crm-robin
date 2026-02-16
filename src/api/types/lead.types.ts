export enum LeadStatus {
  NEW = "new",
  CONTACTED = "contacted",
  QUALIFIED = "qualified",
  CONVERTED = "converted",
  LOST = "lost",
  WON = "won",
}

export enum LeadSource {
  TELEPHONE = "telephone",
  TELEGRAM = "telegram",
  EMAIL = "email",
  INSTAGRAM = "instagram",
  EXHIBITION = "exhibition",
  ETC = "etc",
}

export interface CreateLeadDto {
  firstName?: string;
  lastName: string;
  status?: LeadStatus;
  source?: LeadSource;
  priority?: string;
  company?: string;
  note?: string;
  address?: string;
  phone?: string;
  email?: string;
  assignedToUserId?: number;
  convertedToCompanyId?: number;
  convertedToContactId?: number;
}

export interface UpdateLeadDto {
  firstName?: string;
  lastName?: string;
  status?: LeadStatus;
  source?: LeadSource;
  priority?: string;
  company?: string;
  note?: string;
  address?: string;
  phone?: string;
  email?: string;
  assignedToUserId?: number;
  convertedToCompanyId?: number;
  convertedToContactId?: number;
}

export interface AssignLeadDto {
  assignedToUserId: number;
}

export interface BulkAssignLeadsDto {
  leadIds: number[];
  assignedToUserId: number;
}

export interface BulkDeleteLeadsDto {
  leadIds: number[];
}

export interface BulkChangeLeadStatusDto {
  leadIds: number[];
  status: LeadStatus;
}

export interface ChangeLeadStatusDto {
  status: LeadStatus;
}

export interface LeadEntity {
  id: number;
  firstName?: string;
  lastName: string;
  status: LeadStatus;
  source?: LeadSource;
  priority?: string;
  company?: string;
  note?: string;
  address?: string;
  phone?: string;
  email?: string;
  assignedToUserId?: number;
  assignedByUserId?: number;
  assignedAt?: string;
  convertedToContactId?: number;
  convertedToCompanyId?: number;
  convertedAt?: string | null;
  convertedByUserId?: number | null;
  createdAt: string;
  updatedAt: string;
  assignedToUser?: {
    id: number;
    fullName: string;
  };
  assignedByUser?: {
    id: number;
    fullName: string;
  };
  convertedToContact?: {
    id: number;
  };
  convertedToCompany?: {
    id: number;
    name: string;
  };
  convertedByUser?: {
    id: number;
    fullName: string;
  } | null;
}

export interface LeadQueryParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: LeadStatus;
  source?: LeadSource;
  assignedToUserId?: number;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: string;
}

export interface PaginatedLeadsResponse {
  data: LeadEntity[];
  total: number;
  page: number;
  limit: number;
}


export interface ImportLeadsResponse {
  message: string;
  imported?: number;
  failed?: number;
  errors?: Array<{
    row: number;
    error: string;
  }>;
}
