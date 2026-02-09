import { ENDPOINTS } from "@/api/endpoints";

export const API_CONFIG = {
	BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.robincrm.ir",
	REFRESH: "/auth/refresh",
	TIMEOUT: 30000,
	ENDPOINTS,

	COOKIE_NAMES: {
		ACCESS_TOKEN: "access_token",
		REFRESH_TOKEN: "refresh_token",
	},

	COOKIE_OPTIONS: {
		ACCESS_TOKEN_MAX_AGE: 3 * 60 * 60, 
		REFRESH_TOKEN_MAX_AGE: 7 * 24 * 60 * 60, 
	},
} as const;
