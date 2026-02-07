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

export enum LeadPriority {
	LOW = "low",
	MEDIUM = "medium",
	HIGH = "high",
	URGENT = "urgent",
}

export enum LeadSortField {
	CREATED_AT = "createdAt",
	UPDATED_AT = "updatedAt",
	FIRST_NAME = "firstName",
	LAST_NAME = "lastName",
	EMAIL = "email",
	PHONE = "phone",
	COMPANY = "company",
}

export enum SortOrder {
	ASC = "ASC",
	DESC = "DESC",
}

export interface LeadEntity {
	id: number;
	createdAt: string;
	updatedAt: string;

	firstName?: string | null;
	lastName: string;
	email?: string | null;
	phone?: string | null;
	company?: string | null;

	status: LeadStatus;
	source: LeadSource;
	priority?: LeadPriority | string | null;

	note?: string | null;
	address?: string | null;

	assignedToUserId?: number | null;
	assignedByUserId?: number | null;
	convertedToCompanyId?: number | null;
	convertedToContactId?: number | null;
}

export interface PaginatedLeadsResponse {
	data: LeadEntity[];
	total: number;
	page: number;
	limit: number;
}

export interface LeadListResponse {
	data: LeadEntity[];
}
