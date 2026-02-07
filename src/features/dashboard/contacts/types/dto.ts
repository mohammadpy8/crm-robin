import type { ContactPosition, ContactSortField, SortOrder } from "./entities";

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
	sortField?: ContactSortField;
	sortOrder?: SortOrder;
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

export interface ImportContactsDto {
	file: File;
	assignedToUserId?: number;
}

export interface ImportContactsFormData {
	file: File;
	assignedToUserId?: number;
}
