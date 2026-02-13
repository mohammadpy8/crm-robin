import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/api/core/httpClient";
import { authService } from "@/api/services";
import { showToast } from "@/lib/utils/toast";
import { userKeys } from "./keys";

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: {
			email: string;
			fullName: string;
			password: string;
			phoneNumber: string;
		}) => authService.signup(payload),

		onError: (error) => {
			const errorMessage = getErrorMessage(error);
			showToast.error(`خطا در ایجاد کاربر: ${errorMessage}`);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
			showToast.success("کاربر با موفقیت ایجاد شد");
		},
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			data,
			roleId,
			password,
		}: {
			id: number;
			data: { email?: string; fullName?: string; phoneNumber?: string };
			roleId?: number;
			password?: string;
		}) => {
			await authService.updateUser(id, data);

			if (roleId) {
				await authService.updateRole(id, { roleId });
			}

			if (password) {
				await authService.updatePassword(id, { password });
			}
		},

		onError: (error) => {
			const errorMessage = getErrorMessage(error);
			showToast.error(`خطا در ویرایش کاربر: ${errorMessage}`);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
			showToast.success("کاربر با موفقیت ویرایش شد");
		},
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => authService.deleteUser(id),

		onError: (error) => {
			const errorMessage = getErrorMessage(error);
			showToast.error(`خطا در حذف کاربر: ${errorMessage}`);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
			showToast.success("کاربر با موفقیت حذف شد");
		},
	});
};

export const useRefreshUsers = () => {
	const queryClient = useQueryClient();

	return () => {
		queryClient.invalidateQueries({ queryKey: userKeys.lists() });
	};
};
