/** biome-ignore-all lint/suspicious/useAwait: <> */
/** biome-ignore-all assist/source/useSortedKeys: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { API_CONFIG } from "@/api/core/config";
import { http } from "@/api/core/httpClient";
import type {
	ContactEntity,
	PaginatedContactsResponse,
	ContactQueryParams,
	CreateContactDto,
	UpdateContactDto,
	AssignContactDto,
	BulkAssignContactsDto,
	BulkDeleteContactsDto,
	ImportContactsResponse,
	ContactListItem,
} from "../types";

export const contactService = {
	create: async (data: CreateContactDto): Promise<ContactEntity> => {
		return http.post<ContactEntity>(API_CONFIG.ENDPOINTS.CONTACT.BASE, data);
	},

	getAll: async (params?: ContactQueryParams): Promise<PaginatedContactsResponse> => {
		const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : "";
		return http.get<PaginatedContactsResponse>(`${API_CONFIG.ENDPOINTS.CONTACT.BASE}${queryString}`);
	},

	getList: async (): Promise<ContactListItem[]> => {
		return http.get<ContactListItem[]>(API_CONFIG.ENDPOINTS.CONTACT.LIST);
	},

	getById: async (id: number): Promise<ContactEntity> => {
		return http.get<ContactEntity>(API_CONFIG.ENDPOINTS.CONTACT.BY_ID(id));
	},

	update: async (id: number, data: UpdateContactDto): Promise<ContactEntity> => {
		return http.patch<ContactEntity>(API_CONFIG.ENDPOINTS.CONTACT.BY_ID(id), data);
	},

	delete: async (id: number): Promise<void> => {
		return http.delete<void>(API_CONFIG.ENDPOINTS.CONTACT.BY_ID(id));
	},

	assign: async (id: number, data: AssignContactDto): Promise<ContactEntity> => {
		return http.patch<ContactEntity>(API_CONFIG.ENDPOINTS.CONTACT.ASSIGN(id), data);
	},

	bulkAssign: async (data: BulkAssignContactsDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.CONTACT.BULK_ASSIGN, data);
	},

	bulkDelete: async (data: BulkDeleteContactsDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.CONTACT.BULK_DELETE, data);
	},

	importExcel: async (file: File, assignedToUserId?: number): Promise<ImportContactsResponse> => {
		const formData = new FormData();
		formData.append("file", file);
		if (assignedToUserId) {
			formData.append("assignedToUserId", assignedToUserId.toString());
		}

		return http.post<ImportContactsResponse>(API_CONFIG.ENDPOINTS.CONTACT.IMPORT, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
};
