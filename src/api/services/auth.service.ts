/** biome-ignore-all lint/suspicious/useAwait: <> */
import { API_CONFIG } from "@/api/core/config";
import { http } from "@/api/core/httpClient";
import { cookieManager } from "@/lib/utils/cookie";
import type {
  LoginRequest,
  LoginResponse,
  SignupDto,
  UpdatePasswordDto,
  UpdateRoleDto,
  UpdateUserDto,
  UserEntity,
  UserListItem,
  PaginatedUserResponse,
} from "../types";

export const authService = {
  deleteUser: async (id: number): Promise<void> => {
    return http.delete<void>(API_CONFIG.ENDPOINTS.AUTH.BY_ID(id));
  },

  getProfile: async (): Promise<UserEntity> => {
    return http.get<UserEntity>(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
  },

  getUser: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedUserResponse> => {
    return http.get<PaginatedUserResponse>(API_CONFIG.ENDPOINTS.AUTH.USER, { params });
  },

  getUserList: async (): Promise<UserListItem[]> => {
    return http.get<UserListItem[]>(API_CONFIG.ENDPOINTS.AUTH.LIST);
  },

  isAuthenticated: (): boolean => {
    return !!cookieManager.getAccessToken();
  },
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await http.post<LoginResponse>(API_CONFIG.ENDPOINTS.AUTH.SIGNIN, credentials);

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

  signup: async (data: SignupDto): Promise<void> => {
    return http.post<void>(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, data);
  },

  updatePassword: async (id: number, data: UpdatePasswordDto): Promise<void> => {
    return http.put<void>(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PASSWORD(id), data);
  },

  updateRole: async (id: number, data: UpdateRoleDto): Promise<void> => {
    return http.put<void>(API_CONFIG.ENDPOINTS.AUTH.UPDATE_ROLE(id), data);
  },

  updateUser: async (id: number, data: UpdateUserDto): Promise<void> => {
    return http.patch<void>(API_CONFIG.ENDPOINTS.AUTH.BY_ID(id), data);
  },
};
