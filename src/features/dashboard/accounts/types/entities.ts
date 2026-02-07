export enum CompanyStatus {
	ACTIVE = "active",
	PASSIVE = "passive",
	SUSPENSION = "suspension",
}

export enum CompanyLevel {
	GOLD = "gold",
	SILVER = "silver",
	BRONZE = "bronze",
}

export interface CompanyEntity {
	id: number;
	name: string;
	email: string;
	phone: string;
	nationalId: string;
	note?: string | null;
	status?: CompanyStatus;
	level?: CompanyLevel;
	address?: string | null;
	assignedToUserId?: number | null;
	assignedByUserId?: number | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface PaginatedCompaniesResponse {
	data: CompanyEntity[];
	total: number;
	page: number;
	limit: number;
}

export interface CompanyListItem {
	id: number;
	name: string;
	email?: string;
	phone?: string;
}
