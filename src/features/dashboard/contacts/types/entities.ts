export enum ContactPosition {
	OWNER = "owner",
	MANAGER = "manager",
	ACCOUNTANT = "accountant",
	SECRETARY = "secretary",
	EMPLOYEE = "employee",
	OTHER = "other",
}

export enum ContactSortField {
	CREATED_AT = "createdAt",
	UPDATED_AT = "updatedAt",
	FIRST_NAME = "firstName",
	LAST_NAME = "lastName",
	EMAIL = "email",
	PHONE = "phone",
}

export enum SortOrder {
	ASC = "ASC",
	DESC = "DESC",
}

export interface ContactEntity {
	id: number;
	createdAt: string;
	updatedAt: string;
	firstName?: string | null;
	lastName: string;
	email?: string | null;
	phone: string;
	position?: ContactPosition | null;
	note?: string | null;
	companyId?: number | null;
	assignedToUserId?: number | null;
	assignedByUserId?: number | null;
}

export interface PaginatedContactsResponse {
	data: ContactEntity[];
	total: number;
	page: number;
	limit: number;
}

export interface ContactListResponse {
	data: ContactEntity[];
}
