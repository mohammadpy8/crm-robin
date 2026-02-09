export const ENDPOINTS = {
	AUTH: {
		SIGNIN: "/auth/signin",
		SIGNUP: "/auth/signup",
		REFRESH: "/auth/refresh",
		PROFILE: "/auth/profile",
		LIST: "/auth/list",
		BY_ID: (id: number) => `/auth/${id}`,
		UPDATE_PASSWORD: (id: number) => `/auth/updatepassword/${id}`,
		UPDATE_ROLE: (id: number) => `/auth/role/${id}`,
	},
	LEAD: {
		BASE: "/lead",
		BY_ID: (id: number) => `/lead/${id}`,
		ASSIGN: (id: number) => `/lead/${id}/assign`,
		CONVERT: (id: number) => `/lead/${id}/convert`,
		STATUS: (id: number) => `/lead/${id}/status`,
		BULK_ASSIGN: "/lead/bulk-assign",
		BULK_DELETE: "/lead/bulk-delete",
		BULK_STATUS: "/lead/bulk-change-status",
		IMPORT: "/lead/import-excel",
	},

	CONTACT: {
		BASE: "/contact",
		BY_ID: (id: number) => `/contact/${id}`,
		LIST: "/contact/list",
		ASSIGN: (id: number) => `/contact/${id}/assign`,
		BULK_ASSIGN: "/contact/bulk-assign",
		BULK_DELETE: "/contact/bulk-delete",
		IMPORT: "/contact/import-excel",
	},

	COMPANY: {
		BASE: "/company",
		BY_ID: (id: number) => `/company/${id}`,
		LIST: "/company/list",
		ASSIGN: (id: number) => `/company/${id}/assign`,
		STATUS: (id: number) => `/company/${id}/status`,
		LEVEL: (id: number) => `/company/${id}/level`,
		BULK_ASSIGN: "/company/bulk-assign",
		BULK_DELETE: "/company/bulk-delete",
		BULK_STATUS: "/company/bulk-change-status",
		BULK_LEVEL: "/company/bulk-change-level",
		IMPORT: "/company/import-excel",
	},


} as const;

export type AuthEndpoints = typeof ENDPOINTS.AUTH;
export type LeadEndpoints = typeof ENDPOINTS.LEAD;
export type ContactEndpoints = typeof ENDPOINTS.CONTACT;
export type CompanyEndpoints = typeof ENDPOINTS.COMPANY;