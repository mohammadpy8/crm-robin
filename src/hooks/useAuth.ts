/** biome-ignore-all assist/source/useSortedKeys: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
import { useState } from "react";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { authService } from "@/api/services";
import type { LoginRequest, LoginResponse } from "@/api/types";

interface LoginError {
	message: string;
	statusCode?: number;
	errors?: Record<string, string[]>;
}

interface UseAuthOptions {
	onLoginSuccess?: (data: LoginResponse) => void;
	onLoginError?: (error: LoginError) => void;
	onLogoutSuccess?: () => void;
	callbackUrl?: string;
}

interface UseAuthReturn {
	login: (credentials: LoginRequest) => Promise<void>;
	isLoading: boolean;
	error: LoginError | null;
	isSuccess: boolean;
	logout: () => void;
	reset: () => void;
}

export const useAuth = (options?: UseAuthOptions): UseAuthReturn => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<LoginError | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const login = async (credentials: LoginRequest): Promise<void> => {
		setIsLoading(true);
		setError(null);
		setIsSuccess(false);

		try {
			const response = await authService.login(credentials);
			setIsSuccess(true);

			toast.success("ورود موفقیت‌آمیز بود!");

			options?.onLoginSuccess?.(response);

			const redirectUrl = options?.callbackUrl || "/users/list";
			window.location.href = redirectUrl;
		} catch (err) {
			const axiosError = err as AxiosError<{
				message?: string;
				error?: string;
				statusCode?: number;
			}>;

			const loginError: LoginError = {
				message:
					axiosError.response?.data?.message ||
					axiosError.message ||
					"خطای ناشناخته رخ داده است",
				statusCode: axiosError.response?.status,
			};

			setError(loginError);

			toast.error(loginError.message, {
				duration: 4000,
				position: "top-center",
			});

			options?.onLoginError?.(loginError);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = (): void => {
		authService.logout();
		setError(null);
		setIsSuccess(false);

		window.location.href = "/login";

		options?.onLogoutSuccess?.();
	};

	const reset = (): void => {
		setError(null);
		setIsSuccess(false);
		setIsLoading(false);
	};

	return {
		login,
		isLoading,
		error,
		isSuccess,
		logout,
		reset,
	};
};
