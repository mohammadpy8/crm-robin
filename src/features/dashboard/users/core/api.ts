import { authService } from "@/api/services";
import type { SignupDto, UserListItem } from "@/api/types";
import { User } from "@/api/types/auth.types";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import type { TableRow } from "@/features/shared/ui/table";

export interface UpdateUserPayload {
  data?: {
    email?: string;
    fullName?: string;
    phoneNumber?: string;
  };
  roleId?: number;
  password?: string;
}

export const transformUsersToTableRows = (users: User[]): TableRow[] => {
  return users.data.map((user) => ({
    createdAt: user.createdAt || "",
    email: user.email || "",
    fullName: user.fullName || "",
    id: user.id,
    phone: user.phoneNumber || "",
    role: user.role?.label || "",
  }));
};

const usersService = {
  create: async (payload: SignupDto): Promise<TableRow> => {
    await authService.signup(payload);

    return {
      createdAt: "",
      email: payload.email,
      fullName: payload.fullName,
      id: 0,
      phone: payload.phoneNumber,
      role: "",
    };
  },

  delete: async (id: number): Promise<void> => {
    await authService.deleteUser(id);
  },

  getAll: async (params?: BaseQueryParams): Promise<TableRow[]> => {
    const response = await authService.getUser();
    return transformUsersToTableRows(response);
  },

  update: async (id: number, payload: UpdateUserPayload): Promise<TableRow> => {
    if (payload.data) {
      await authService.updateUser(id, payload.data);
    }
    if (payload.roleId) {
      await authService.updateRole(id, { roleId: payload.roleId });
    }
    if (payload.password) {
      await authService.updatePassword(id, { password: payload.password });
    }

    return {
      createdAt: "",
      email: payload.data?.email || "",
      fullName: payload.data?.fullName || "",
      id,
      phone: payload.data?.phoneNumber || "",
      role: "",
    };
  },
};

export const {
  keys: userKeys,
  useListQuery: useUsersQuery,
  useCreate: useCreateUser,
  useUpdate: useUpdateUser,
  useDelete: useDeleteUser,
  useRefresh: useRefreshUsers,
} = createApiHooks<TableRow, SignupDto, UpdateUserPayload>({
  messages: {
    createSuccess: "کاربر با موفقیت ایجاد شد",
    deleteSuccess: "کاربر با موفقیت حذف شد",
    updateSuccess: "کاربر با موفقیت ویرایش شد",
  },
  queryKey: "users",
  retry: 2,
  service: usersService,
  staleTime: 1000 * 60 * 2,
});
