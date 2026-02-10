/** biome-ignore-all lint/suspicious/useAwait: <> */
import { API_CONFIG } from "@/api/core/config";
import { http } from "@/api/core/httpClient";
import type {
	AssignCompanyDto,
	BulkAssignCompanyDto,
	BulkChangeCompanyStatusDto,
	BulkChangeLevelDto,
	BulkDeleteCompanyDto,
	ChangeCompanyStatusDto,
	ChangeLevelDto,
	CompanyEntity,
	CompanyListItem,
	CompanyQueryParams,
	CreateCompanyDto,
	ImportCompaniesResponse,
	PaginatedCompaniesResponse,
	UpdateCompanyDto,
} from "../types";

export const companyService = {
	assign: async (id: number, data: AssignCompanyDto): Promise<CompanyEntity> => {
		return http.patch<CompanyEntity>(API_CONFIG.ENDPOINTS.COMPANY.ASSIGN(id), data);
	},
	bulkAssign: async (data: BulkAssignCompanyDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.COMPANY.BULK_ASSIGN, data);
	},
	bulkChangeLevel: async (data: BulkChangeLevelDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.COMPANY.BULK_LEVEL, data);
	},
	bulkChangeStatus: async (data: BulkChangeCompanyStatusDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.COMPANY.BULK_STATUS, data);
	},
	bulkDelete: async (data: BulkDeleteCompanyDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.COMPANY.BULK_DELETE, data);
	},
	changeLevel: async (id: number, data: ChangeLevelDto): Promise<CompanyEntity> => {
		return http.patch<CompanyEntity>(API_CONFIG.ENDPOINTS.COMPANY.LEVEL(id), data);
	},
	changeStatus: async (
		id: number,
		data: ChangeCompanyStatusDto,
	): Promise<CompanyEntity> => {
		return http.patch<CompanyEntity>(API_CONFIG.ENDPOINTS.COMPANY.STATUS(id), data);
	},
	create: async (data: CreateCompanyDto): Promise<CompanyEntity> => {
		return http.post<CompanyEntity>(API_CONFIG.ENDPOINTS.COMPANY.BASE, data);
	},
	delete: async (id: number): Promise<void> => {
		return http.delete<void>(API_CONFIG.ENDPOINTS.COMPANY.BY_ID(id));
	},
	getAll: async (params?: CompanyQueryParams): Promise<PaginatedCompaniesResponse> => {
		const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : "";
		return http.get<PaginatedCompaniesResponse>(
			`${API_CONFIG.ENDPOINTS.COMPANY.BASE}${queryString}`,
		);
	},
	getById: async (id: number): Promise<CompanyEntity> => {
		return http.get<CompanyEntity>(API_CONFIG.ENDPOINTS.COMPANY.BY_ID(id));
	},
	getList: async (): Promise<CompanyListItem[]> => {
		return http.get<CompanyListItem[]>(API_CONFIG.ENDPOINTS.COMPANY.LIST);
	},
	importExcel: async (
		file: File,
		assignedToUserId?: number,
	): Promise<ImportCompaniesResponse> => {
		const formData = new FormData();
		formData.append("file", file);
		if (assignedToUserId) {
			formData.append("assignedToUserId", assignedToUserId.toString());
		}

		return http.post<ImportCompaniesResponse>(
			API_CONFIG.ENDPOINTS.COMPANY.IMPORT,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);
	},
	update: async (id: number, data: UpdateCompanyDto): Promise<CompanyEntity> => {
		return http.patch<CompanyEntity>(API_CONFIG.ENDPOINTS.COMPANY.BY_ID(id), data);
	},
};
