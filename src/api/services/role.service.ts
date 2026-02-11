// api/services/role.service.ts
/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
/** biome-ignore-all lint/suspicious/useAwait: <> */
import { API_CONFIG } from "@/api/core/config";
import { http } from "@/api/core/httpClient";
import type { PaginatedRolesResponse, RoleQueryParams } from "../types";

export const roleService = {
	getAll: async (params?: RoleQueryParams): Promise<PaginatedRolesResponse> => {
		const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : "";
		return http.get<PaginatedRolesResponse>(
			`${API_CONFIG.ENDPOINTS.ROLE.BASE}${queryString}`,
		);
	},
};
