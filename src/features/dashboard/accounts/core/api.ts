import { companyService } from "@/api/services";
import type { CompanyEntity, CreateCompanyDto, UpdateCompanyDto } from "@/api/types";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import type { TableRow } from "@/features/shared/ui/table";
import { UserOption } from "@/store/useUserStore.";


export interface UpdateAccountPayload {
  data: UpdateCompanyDto;
}

const toJalali = (gregorianDate: string): string => {
  if (!gregorianDate) return "";

  try {
    const date = new Date(gregorianDate);
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      calendar: "persian",
    });

    return formatter.format(date);
  } catch {
    return "";
  }
};



export const transformAccountsToTableRows = (items: CompanyEntity[]): TableRow[] =>
  items.map((c) => ({
    assignedToUserId: String(c.assignedToUserId),
    createdAt: toJalali(c.createdAt || ""),
    email: c.email || "",
    id: c.id,
    level: c.level || "",
    name: c.name,
    nationalId: c.nationalId,
    phone: c.phone,
    status: c.status || "",
    website: "--",
  }));

const accountsService = {
  create: async (payload: CreateCompanyDto): Promise<TableRow> => {
    const res = await companyService.create(payload);
    return transformAccountsToTableRows([res])[0];
  },

  delete: async (id: number): Promise<void> => {
    await companyService.delete(id);
  },

  getAll: async (params?: BaseQueryParams): Promise<TableRow[]> => {
    const page = Math.max(1, Number(params?.page || 1));
    const limit = Math.max(1, Number(params?.limit || 10));
    const res = await companyService.getAll({ ...params, limit, page });
    return transformAccountsToTableRows(res.data);
  },

  update: async (id: number, payload: UpdateAccountPayload): Promise<TableRow> => {
    const res = await companyService.update(id, payload.data);
    return transformAccountsToTableRows([res])[0];
  },
};

export const {
  useListQuery: useAccountsQuery,
  useCreate: useCreateAccount,
  useUpdate: useUpdateAccount,
  useDelete: useDeleteAccount,
  useRefresh: useRefreshAccounts,
} = createApiHooks<TableRow, CreateCompanyDto, UpdateAccountPayload>({
  messages: {
    createSuccess: "سازمان با موفقیت ایجاد شد",
    deleteSuccess: "سازمان با موفقیت حذف شد",
    updateSuccess: "سازمان با موفقیت ویرایش شد",
  },
  queryKey: "accounts",
  service: accountsService,
});
