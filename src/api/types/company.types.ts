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

export interface UserReference {
	id: number;
	fullName: string;
}

export interface CreateCompanyDto {
	name: string;
	email?: string;
	phone: string;
	nationalId: string;
	note?: string;
	status?: CompanyStatus;
	level?: CompanyLevel;
	address?: string;
	assignedToUserId?: number;
}

export interface UpdateCompanyDto {
	name?: string;
	email?: string;
	phone?: string;
	note?: string;
	status?: CompanyStatus;
	level?: CompanyLevel;
	address?: string;
	nationalId?: string;
	assignedToUserId?: number;
}

export interface AssignCompanyDto {
	assignedToUserId: number;
}

export interface BulkAssignCompanyDto {
	companyIds: number[];
	assignedToUserId: number;
}

export interface BulkDeleteCompanyDto {
	companyIds: number[];
}

export interface BulkChangeCompanyStatusDto {
	companyIds: number[];
	status: CompanyStatus;
}

export interface ChangeCompanyStatusDto {
	status: CompanyStatus;
}

export interface BulkChangeLevelDto {
	companyIds: number[];
	level: CompanyLevel;
}

export interface ChangeLevelDto {
	level: CompanyLevel;
}

export interface UploadCompaniesExcelDto {
	file: File;
	assignedToUserId?: number;
}

// CompanyEntity با nested objects (برای هر دو list و detail)
export interface CompanyEntity {
	id: number;
	name: string;
	email?: string;
	phone: string;
	nationalId: string;
	note?: string;
	address?: string;
	status?: CompanyStatus;
	level?: CompanyLevel;
	assignedToUser?: UserReference;
	assignedToUserId: number;
	assignedByUser?: UserReference;
	assignedByUserId: number;
	assignedAt?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CompanyQueryParams {
	name?: string;
	email?: string;
	phone?: string;
	nationalId?: string;
	status?: CompanyStatus;
	level?: CompanyLevel;
	assignedToUserId?: number;
	page?: number;
	limit?: number;
	sortField?: "createdAt" | "updatedAt" | "name" | "email" | "phone";
	sortOrder?: "ASC" | "DESC";
}

export interface PaginatedCompaniesResponse {
	data: CompanyEntity[];
	total: number;
	page: number;
	limit: number;
}

export interface ImportCompaniesResponse {
	message: string;
	imported: number;
	failed?: number;
	errors?: Array<{
		row: number;
		error: string;
	}>;
}

export interface CompanyListItem {
	id: number;
	name: string;
	phone: string;
	email?: string;
}