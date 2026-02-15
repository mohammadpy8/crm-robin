export const ENDPOINTS = {
  AUTH: {
    BY_ID: (id: number) => `/auth/${id}`,
    USER: "/auth",
    LIST: "/auth/list",
    PROFILE: "/auth/profile",
    REFRESH: "/auth/refresh",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    UPDATE_PASSWORD: (id: number) => `/auth/updatepassword/${id}`,
    UPDATE_ROLE: (id: number) => `/auth/role/${id}`,
  },

  COMPANY: {
    ASSIGN: (id: number) => `/company/${id}/assign`,
    BASE: "/company",
    BULK_ASSIGN: "/company/bulk-assign",
    BULK_DELETE: "/company/bulk-delete",
    BULK_LEVEL: "/company/bulk-change-level",
    BULK_STATUS: "/company/bulk-change-status",
    BY_ID: (id: number) => `/company/${id}`,
    IMPORT: "/company/import-excel",
    LEVEL: (id: number) => `/company/${id}/level`,
    LIST: "/company/list",
    STATUS: (id: number) => `/company/${id}/status`,
  },

  CONTACT: {
    ASSIGN: (id: number) => `/contact/${id}/assign`,
    BASE: "/contact",
    BULK_ASSIGN: "/contact/bulk-assign",
    BULK_DELETE: "/contact/bulk-delete",
    BY_ID: (id: number) => `/contact/${id}`,
    IMPORT: "/contact/import-excel",
    LIST: "/contact/list",
  },
  LEAD: {
    ASSIGN: (id: number) => `/lead/${id}/assign`,
    BASE: "/lead",
    BULK_ASSIGN: "/lead/bulk-assign",
    BULK_DELETE: "/lead/bulk-delete",
    BULK_STATUS: "/lead/bulk-change-status",
    BY_ID: (id: number) => `/lead/${id}`,
    CONVERT: (id: number) => `/lead/${id}/convert`,
    IMPORT: "/lead/import-excel",
    STATUS: (id: number) => `/lead/${id}/status`,
  },
  ROLE: {
    BASE: "/role",
  },
} as const;

export type AuthEndpoints = typeof ENDPOINTS.AUTH;
export type LeadEndpoints = typeof ENDPOINTS.LEAD;
export type ContactEndpoints = typeof ENDPOINTS.CONTACT;
export type CompanyEndpoints = typeof ENDPOINTS.COMPANY;
export type RoleEndpoints = typeof ENDPOINTS.ROLE;
