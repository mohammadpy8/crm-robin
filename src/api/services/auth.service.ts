/** biome-ignore-all lint/suspicious/useAwait: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all assist/source/useSortedKeys: <> */
import { API_CONFIG } from "@/api/core/config";
import { http } from "@/api/core/httpClient";
import { cookieManager } from "@/lib/utils/cookie";
import type {
	LoginRequest,
	LoginResponse,
	SignupDto,
	UserEntity,
	UserListItem,
	UpdateUserDto,
	UpdatePasswordDto,
	UpdateRoleDto,
} from "../types";

export const authService = {
	login: async (credentials: LoginRequest): Promise<LoginResponse> => {
		const response = await http.post<LoginResponse>(
			API_CONFIG.ENDPOINTS.AUTH.SIGNIN,
			credentials,
		);

		cookieManager.setAccessToken(response.accessToken);
		cookieManager.setRefreshToken(response.refreshToken);

		return response;
	},

	logout: (): void => {
		cookieManager.clearTokens();
		if (typeof window !== "undefined") {
			window.location.href = "/login";
		}
	},

	isAuthenticated: (): boolean => {
		return !!cookieManager.getAccessToken();
	},

	signup: async (data: SignupDto): Promise<void> => {
		return http.post<void>(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, data);
	},

	getProfile: async (): Promise<UserEntity> => {
		return http.get<UserEntity>(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
	},

	getUserList: async (): Promise<UserListItem[]> => {
		return http.get<UserListItem[]>(API_CONFIG.ENDPOINTS.AUTH.LIST);
	},

	updateUser: async (id: number, data: UpdateUserDto): Promise<void> => {
		return http.patch<void>(API_CONFIG.ENDPOINTS.AUTH.BY_ID(id), data);
	},

	deleteUser: async (id: number): Promise<void> => {
		return http.delete<void>(API_CONFIG.ENDPOINTS.AUTH.BY_ID(id));
	},

	updatePassword: async (id: number, data: UpdatePasswordDto): Promise<void> => {
		return http.put<void>(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PASSWORD(id), data);
	},

	updateRole: async (id: number, data: UpdateRoleDto): Promise<void> => {
		return http.put<void>(API_CONFIG.ENDPOINTS.AUTH.UPDATE_ROLE(id), data);
	},
};
