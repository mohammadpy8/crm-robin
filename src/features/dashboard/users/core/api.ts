import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import { authService } from "@/api/services";
import type { SignupDto, UserListItem } from "@/api/types";
import type { TableRow } from "@/features/shared/ui/table";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";



export interface UpdateUserPayload {
  data?: {
    email?: string;
    fullName?: string;
    phoneNumber?: string;
  };
  roleId?: number;
  password?: string;
}


export const transformUsersToTableRows = (users: UserListItem[]): TableRow[] =>
  users.map((user) => ({
    id: user.id,
    fullName: user.fullName || "",
    phone: "",
    email: "",
    role: "",
    createdAt: "",
  }));




const usersService = {

  getAll: async (params?: BaseQueryParams): Promise<TableRow[]> => {
    const response = await authService.getUserList();
    return transformUsersToTableRows(response);
  },


  create: async (payload: SignupDto): Promise<TableRow> => {
    await authService.signup(payload);
    
  
    return {
      id: 0,                     
      fullName: payload.fullName,
      phone: payload.phoneNumber,
      email: payload.email,
      role: "",
      createdAt: "",
    };
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
      id,
      fullName: payload.data?.fullName || "",
      phone: payload.data?.phoneNumber || "",
      email: payload.data?.email || "",
      role: "",
      createdAt: "",
    };
  },

  delete: async (id: number): Promise<void> => {
    await authService.deleteUser(id);
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
  queryKey: "users",
  service: usersService,
  messages: {
    createSuccess: "کاربر با موفقیت ایجاد شد",
    updateSuccess: "کاربر با موفقیت ویرایش شد",
    deleteSuccess: "کاربر با موفقیت حذف شد",
  },
  retry: 2,
  staleTime: 1000 * 60 * 2,
});
