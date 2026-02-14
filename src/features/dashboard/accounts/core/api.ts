import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import { companyService } from "@/api/services";
import type { CompanyEntity, CreateCompanyDto, UpdateCompanyDto } from "@/api/types";
import type { TableRow } from "@/features/shared/ui/table";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";

export interface UpdateAccountPayload {
  data: UpdateCompanyDto;
}

export const transformAccountsToTableRows = (items: CompanyEntity[]): TableRow[] =>
  items.map((c) => ({
    id: c.id,
    nationalId: c.nationalId,
    name: c.name,
    website: "",
    phone: c.phone,
    level: c.level || "",
    email: c.email || "",
    status: c.status || "",
    createdAt: c.createdAt || "",
    assignTo: c.assignedToUserId ? String(c.assignedToUserId) : "",
  }));

const accountsService = {
  getAll: async (params?: BaseQueryParams): Promise<TableRow[]> => {
    const page = Math.max(1, Number(params?.page || 1));
    const limit = Math.max(1, Number(params?.limit || 10));
    const res = await companyService.getAll({ ...params, page, limit });
    return transformAccountsToTableRows(res.data);
  },

  create: async (payload: CreateCompanyDto): Promise<TableRow> => {
    const res = await companyService.create(payload);
    return transformAccountsToTableRows([res])[0];
  },

  update: async (id: number, payload: UpdateAccountPayload): Promise<TableRow> => {
    const res = await companyService.update(id, payload.data);
    return transformAccountsToTableRows([res])[0];
  },

  delete: async (id: number): Promise<void> => {
    await companyService.delete(id);
  },
};

export const {
  useListQuery: useAccountsQuery,
  useCreate: useCreateAccount,
  useUpdate: useUpdateAccount,
  useDelete: useDeleteAccount,
  useRefresh: useRefreshAccounts,
} = createApiHooks<TableRow, CreateCompanyDto, UpdateAccountPayload>({
  queryKey: "accounts",
  service: accountsService,
  messages: {
    createSuccess: "سازمان با موفقیت ایجاد شد",
    updateSuccess: "سازمان با موفقیت ویرایش شد",
    deleteSuccess: "سازمان با موفقیت حذف شد",
  },
});
