/** biome-ignore-all lint/suspicious/useAwait: <> */
import { API_CONFIG } from "@/api/core/config";
import { http } from "@/api/core/httpClient";
import type {
	AssignLeadDto,
	BulkAssignLeadsDto,
	BulkChangeLeadStatusDto,
	BulkDeleteLeadsDto,
	ChangeLeadStatusDto,
	CreateLeadDto,
	ImportLeadsResponse,
	LeadEntity,
	LeadQueryParams,
	PaginatedLeadsResponse,
	UpdateLeadDto,
} from "../types";

export const leadService = {
	assign: async (id: number, data: AssignLeadDto): Promise<LeadEntity> => {
		return http.patch<LeadEntity>(API_CONFIG.ENDPOINTS.LEAD.ASSIGN(id), data);
	},

	bulkAssign: async (data: BulkAssignLeadsDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.LEAD.BULK_ASSIGN, data);
	},

	bulkChangeStatus: async (data: BulkChangeLeadStatusDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.LEAD.BULK_STATUS, data);
	},

	bulkDelete: async (data: BulkDeleteLeadsDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.LEAD.BULK_DELETE, data);
	},

	changeStatus: async (id: number, data: ChangeLeadStatusDto): Promise<LeadEntity> => {
		return http.patch<LeadEntity>(API_CONFIG.ENDPOINTS.LEAD.STATUS(id), data);
	},

	convert: async (id: number): Promise<LeadEntity> => {
		return http.patch<LeadEntity>(API_CONFIG.ENDPOINTS.LEAD.CONVERT(id));
	},
	create: async (data: CreateLeadDto): Promise<LeadEntity> => {
		return http.post<LeadEntity>(API_CONFIG.ENDPOINTS.LEAD.BASE, data);
	},

	delete: async (id: number): Promise<void> => {
		return http.delete<void>(API_CONFIG.ENDPOINTS.LEAD.BY_ID(id));
	},

	getAll: async (params?: LeadQueryParams): Promise<PaginatedLeadsResponse> => {
		const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : "";
		return http.get<PaginatedLeadsResponse>(
			`${API_CONFIG.ENDPOINTS.LEAD.BASE}${queryString}`,
		);
	},

	getById: async (id: number): Promise<LeadEntity> => {
		return http.get<LeadEntity>(API_CONFIG.ENDPOINTS.LEAD.BY_ID(id));
	},

	importExcel: async (
		file: File,
		assignedToUserId?: number,
	): Promise<ImportLeadsResponse> => {
		const formData = new FormData();
		formData.append("file", file);
		if (assignedToUserId) {
			formData.append("assignedToUserId", assignedToUserId.toString());
		}

		return http.post<ImportLeadsResponse>(API_CONFIG.ENDPOINTS.LEAD.IMPORT, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},

	update: async (id: number, data: UpdateLeadDto): Promise<LeadEntity> => {
		return http.patch<LeadEntity>(API_CONFIG.ENDPOINTS.LEAD.BY_ID(id), data);
	},
};
