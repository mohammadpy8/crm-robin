/** biome-ignore-all assist/source/useSortedKeys: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
import axios, {
	type AxiosError,
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";
import { API_CONFIG } from "./config";
import { cookieManager } from "../../lib/utils/cookie";

interface ApiErrorResponse {
	message: string | string[];
	statusCode?: number;
	errors?: Record<string, string[]>;
}

interface RefreshTokenResponse {
	accessToken: string;
}

interface QueueItem {
	resolve: (value: unknown) => void;
	reject: (reason: unknown) => void;
}

export const getErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		const axiosError = error as AxiosError<ApiErrorResponse>;
		const serverMessage = axiosError.response?.data?.message;
		
		if (serverMessage) {
			return Array.isArray(serverMessage) 
				? serverMessage.join(", ") 
				: serverMessage;
		}
		
		return axiosError.message || "خطای ناشناخته";
	}
	
	if (error instanceof Error) {
		return error.message;
	}
	
	return "خطای ناشناخته";
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null): void => {
	failedQueue.forEach((promise) => {
		if (error) {
			promise.reject(error);
		} else {
			promise.resolve(token);
		}
	});
	failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	timeout: API_CONFIG.TIMEOUT,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = cookieManager.getAccessToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError<ApiErrorResponse>) => {
		const originalRequest = error.config as
			| (AxiosRequestConfig & { _retry?: boolean })
			| undefined;

		if (!originalRequest) {
			return Promise.reject(error);
		}

		const isLoginEndpoint = originalRequest.url?.includes("/auth/signin");

		if (error.response?.status === 401 && !originalRequest._retry && !isLoginEndpoint) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(() => axiosInstance(originalRequest))
					.catch((err: unknown) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			const refreshToken = cookieManager.getRefreshToken();

			if (!refreshToken) {
				processQueue(new Error("No refresh token"), null);
				cookieManager.clearTokens();
				if (typeof window !== "undefined") {
					window.location.href = "/login";
				}
				return Promise.reject(error);
			}

			try {
				const { data } = await axios.post<RefreshTokenResponse>(
					`${API_CONFIG.BASE_URL}${API_CONFIG.REFRESH}`,
					{ refreshToken },
				);

				cookieManager.setAccessToken(data.accessToken);

				processQueue(null, data.accessToken);

				return axiosInstance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError as Error, null);
				cookieManager.clearTokens();
				if (typeof window !== "undefined") {
					window.location.href = "/login";
				}
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

export const http = {
	get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
		axiosInstance.get<T>(url, config).then((res) => res.data),

	post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
		axiosInstance.post<T>(url, data, config).then((res) => res.data),

	put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
		axiosInstance.put<T>(url, data, config).then((res) => res.data),

	patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
		axiosInstance.patch<T>(url, data, config).then((res) => res.data),

	delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
		axiosInstance.delete<T>(url, config).then((res) => res.data),
};

export { axiosInstance };
export default http;
