import type { CompanyLevel, CompanyStatus } from "./entities";

export interface CreateCompanyDto {
	name: string;
	email: string;
	phone: string;
	nationalId: string;
	note: string;
	status: CompanyStatus;
	level: CompanyLevel;
	address: string;
	assignedToUserId: number;
}

export interface UpdateCompanyDto {
	name?: string;
	email?: string;
	phone?: string;
	nationalId?: string;
	note?: string;
	status?: CompanyStatus;
	level?: CompanyLevel;
	address?: string;
	assignedToUserId?: number;
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

export interface AssignCompanyDto {
	assignedToUserId: number;
}

export interface ChangeCompanyStatusDto {
	status: CompanyStatus;
}

export interface ChangeCompanyLevelDto {
	level: CompanyLevel;
}

export interface BulkAssignCompaniesDto {
	companyIds: number[];
	assignedToUserId: number;
}

export interface BulkDeleteCompaniesDto {
	companyIds: number[];
}

export interface BulkChangeStatusDto {
	companyIds: number[];
	status: CompanyStatus;
}

export interface BulkChangeLevelDto {
	companyIds: number[];
	level: CompanyLevel;
}

export interface ImportCompaniesDto {
	file: File;
	assignedToUserId?: number;
}
