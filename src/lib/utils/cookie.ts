// src/core/utils/cookie.ts
/** biome-ignore-all assist/source/useSortedKeys: <> */
import Cookies from "js-cookie";
import { API_CONFIG } from "@/api/core/config";

export const cookieManager = {
	setAccessToken: (token: string) => {
		Cookies.set(API_CONFIG.COOKIE_NAMES.ACCESS_TOKEN, token, {
			expires: 1 / 8, // 3 ساعت
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});
	},

	setRefreshToken: (token: string) => {
		Cookies.set(API_CONFIG.COOKIE_NAMES.REFRESH_TOKEN, token, {
			expires: 7,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});
	},

	getAccessToken: () => Cookies.get(API_CONFIG.COOKIE_NAMES.ACCESS_TOKEN),
	getRefreshToken: () => Cookies.get(API_CONFIG.COOKIE_NAMES.REFRESH_TOKEN),

	clearTokens: () => {
		Cookies.remove(API_CONFIG.COOKIE_NAMES.ACCESS_TOKEN);
		Cookies.remove(API_CONFIG.COOKIE_NAMES.REFRESH_TOKEN);
	},
};
