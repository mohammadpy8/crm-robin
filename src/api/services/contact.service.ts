/** biome-ignore-all lint/suspicious/useAwait: <> */
import { API_CONFIG } from "@/api/core/config";
import { http } from "@/api/core/httpClient";
import buildQueryString from "@/lib/utils/queryString";
import type {
	AssignContactDto,
	BulkAssignContactsDto,
	BulkDeleteContactsDto,
	ContactEntity,
	ContactListItem,
	ContactQueryParams,
	CreateContactDto,
	ImportContactsResponse,
	PaginatedContactsResponse,
	UpdateContactDto,
} from "../types";

export const contactService = {
	assign: async (id: number, data: AssignContactDto): Promise<ContactEntity> => {
		return http.patch<ContactEntity>(API_CONFIG.ENDPOINTS.CONTACT.ASSIGN(id), data);
	},

	bulkAssign: async (data: BulkAssignContactsDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.CONTACT.BULK_ASSIGN, data);
	},

	bulkDelete: async (data: BulkDeleteContactsDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.CONTACT.BULK_DELETE, data);
	},
	create: async (data: CreateContactDto): Promise<ContactEntity> => {
		return http.post<ContactEntity>(API_CONFIG.ENDPOINTS.CONTACT.BASE, data);
	},

	delete: async (id: number): Promise<void> => {
		return http.delete<void>(API_CONFIG.ENDPOINTS.CONTACT.BY_ID(id));
	},

	getAll: async (params?: ContactQueryParams): Promise<PaginatedContactsResponse> => {
		return http.get<PaginatedContactsResponse>(
			`${API_CONFIG.ENDPOINTS.CONTACT.BASE}${buildQueryString(params)}`,
		);
	},

	getById: async (id: number): Promise<ContactEntity> => {
		return http.get<ContactEntity>(API_CONFIG.ENDPOINTS.CONTACT.BY_ID(id));
	},

	getList: async (): Promise<ContactListItem[]> => {
		return http.get<ContactListItem[]>(API_CONFIG.ENDPOINTS.CONTACT.LIST);
	},

	importExcel: async (
		file: File,
		assignedToUserId?: number,
	): Promise<ImportContactsResponse> => {
		const formData = new FormData();
		formData.append("file", file);
		if (assignedToUserId) {
			formData.append("assignedToUserId", assignedToUserId.toString());
		}

		return http.post<ImportContactsResponse>(
			API_CONFIG.ENDPOINTS.CONTACT.IMPORT,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);
	},

	update: async (id: number, data: UpdateContactDto): Promise<ContactEntity> => {
		return http.patch<ContactEntity>(API_CONFIG.ENDPOINTS.CONTACT.BY_ID(id), data);
	},
};
