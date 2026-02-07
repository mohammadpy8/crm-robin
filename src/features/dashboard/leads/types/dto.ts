import type {
	LeadPriority,
	LeadSortField,
	LeadSource,
	LeadStatus,
	SortOrder,
} from "./entities";

export interface CreateLeadDto {
	firstName?: string;
	lastName: string;
	status?: LeadStatus;
	source?: LeadSource;
	priority?: LeadPriority | string;
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
	priority?: LeadPriority | string;
	company?: string;
	note?: string;
	address?: string;
	phone?: string;
	email?: string;
	assignedToUserId?: number;
	convertedToCompanyId?: number;
	convertedToContactId?: number;
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
	sortField?: LeadSortField;
	sortOrder?: SortOrder;
}

export interface AssignLeadDto {
	assignedToUserId: number;
}

export interface ConvertLeadDto {
	convertToCompany?: boolean;
	convertToContact?: boolean;
	companyId?: number;
	contactId?: number;
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

export interface ImportLeadsDto {
	file: File;
	assignedToUserId?: number;
}

export interface ImportLeadsFormData {
	file: File;
	assignedToUserId?: number;
}
