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

export interface UploadContactsExcelDto {
	file: File;
	assignedToUserId?: number;
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
	createdAt: string;
	updatedAt: string;
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
	sortField?: "createdAt" | "updatedAt" | "firstName" | "lastName" | "email" | "phone";
	sortOrder?: "ASC" | "DESC";
}


export interface PaginatedContactsResponse {
	data: ContactEntity[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface ImportContactsResponse {
	message: string;
	imported: number;
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
