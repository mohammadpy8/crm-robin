import { authService } from "@/api/services";
import type { SignupDto } from "@/api/types";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import { useUsersStore } from "./store";
import type { UpdateUserPayload, UserTableRow } from "./types";
import { ITEMS_PER_PAGE, toTableRow } from "./utils";

const usersService = {
	create: async (payload: SignupDto): Promise<UserTableRow> => {
		await authService.signup(payload);

		// Return a temporary row since signup doesn't return the created user
		return {
			createdAt: "",
			email: payload.email,
			fullName: payload.fullName,
			id: 0,
			phone: payload.phoneNumber,
			role: "-",
		};
	},

	delete: async (id: number): Promise<void> => {
		await authService.deleteUser(id);
	},
	getAll: async (params?: BaseQueryParams): Promise<UserTableRow[]> => {
		const page = Math.max(1, Number(params?.page ?? 1));
		const limit = ITEMS_PER_PAGE;

		const queryParams: { page?: number; limit?: number; search?: string } = {
			limit,
			page,
		};

		// Handle search from filters
		if (params?.filters?.fullName) {
			queryParams.search = String(params.filters.fullName);
		}

		const response = await authService.getUser(queryParams);

		useUsersStore.getState().setTotalItems(response.total);

		return response.data.map(toTableRow);
	},

	update: async (id: number, payload: UpdateUserPayload): Promise<UserTableRow> => {
		if (payload.data) {
			await authService.updateUser(id, payload.data);
		}
		if (payload.roleId) {
			await authService.updateRole(id, { roleId: payload.roleId });
		}
		if (payload.password) {
			await authService.updatePassword(id, { password: payload.password });
		}

		// Return a temporary row since updates don't return the updated user
		return {
			createdAt: "",
			email: payload.data?.email || "",
			fullName: payload.data?.fullName || "",
			id,
			phone: payload.data?.phoneNumber || "",
			role: "-",
		};
	},
};

export const {
	useListQuery: useUsersQuery,
	useCreate: useCreateUser,
	useUpdate: useUpdateUser,
	useDelete: useDeleteUser,
	useRefresh: useRefreshUsers,
} = createApiHooks<UserTableRow, SignupDto, UpdateUserPayload>({
	messages: {
		createSuccess: "کاربر با موفقیت ایجاد شد",
		deleteSuccess: "کاربر با موفقیت حذف شد",
		updateSuccess: "کاربر با موفقیت ویرایش شد",
	},
	queryKey: "users",
	service: usersService,
});
