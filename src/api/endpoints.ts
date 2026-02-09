/** biome-ignore-all assist/source/useSortedKeys: <> */

export const ENDPOINTS = {
	AUTH: {
		SIGNIN: "/auth/signin",
		SIGNUP: "/auth/signup",
	},
} as const;

export type AuthEndpoints = typeof ENDPOINTS.AUTH;
