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
	firstName: string;
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

export interface UploadLeadsExcelDto {
	file: File;
	assignedToUserId?: number;
}

export interface LeadEntity {
	id: number;
	firstName: string;
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
	convertedToCompanyId?: number;
	convertedToContactId?: number;
	createdAt: string;
	updatedAt: string;
}

export interface LeadQueryParams {
	page?: number;
	limit?: number;
	sortField?: keyof LeadEntity;
	sortOrder?: "ASC" | "DESC";
	search?: string;
	status?: LeadStatus;
	source?: LeadSource;
	assignedToUserId?: number;
}

export interface PaginatedLeadsResponse {
	data: LeadEntity[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface ImportLeadsResponse {
	message: string;
	imported: number;
	failed?: number;
	errors?: Array<{
		row: number;
		error: string;
	}>;
}
