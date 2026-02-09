/** biome-ignore-all assist/source/useSortedKeys: <> */
import { API_CONFIG } from "@/api/core/config";
import { http } from "@/api/core/httpClient";
import { cookieManager } from "@/lib/utils/cookie";
import type { LoginRequest, LoginResponse } from "../types";

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
};
