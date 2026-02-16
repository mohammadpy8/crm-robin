/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { companyService } from "@/api/services";
import type { CreateCompanyDto, UpdateCompanyDto } from "@/api/types";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import { useAccountsStore } from "./store";
import type { AccountTableRow } from "./types";
import { ITEMS_PER_PAGE, toTableRow } from "./utils";

const accountsService = {
	create: async (payload: CreateCompanyDto): Promise<AccountTableRow> => {
		const company = await companyService.create(payload);
		return toTableRow(company);
	},

	delete: async (id: number): Promise<void> => {
		await companyService.delete(id);
	},
	getAll: async (params?: BaseQueryParams): Promise<AccountTableRow[]> => {
		const page = Math.max(1, Number(params?.page ?? 1));
		const limit = ITEMS_PER_PAGE;

		const cleanParams: Record<string, any> = {
			limit,
			page,
		};

		if (params?.filters && Object.keys(params.filters).length > 0) {
			Object.entries(params.filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== "") {
					cleanParams[key] = value;
				}
			});
		}

		if (params?.sortField && params?.sortOrder) {
			cleanParams.sortField = params.sortField;
			cleanParams.sortOrder = params.sortOrder.toUpperCase();
		}

		const response = await companyService.getAll(cleanParams);

		useAccountsStore.getState().setTotalItems(response.total);

		return response.data.map(toTableRow);
	},

	update: async (id: number, payload: UpdateCompanyDto): Promise<AccountTableRow> => {
		const company = await companyService.update(id, payload);
		return toTableRow(company);
	},
};

export const {
	useListQuery: useAccountsQuery,
	useCreate: useCreateAccount,
	useUpdate: useUpdateAccount,
	useDelete: useDeleteAccount,
	useRefresh: useRefreshAccounts,
} = createApiHooks<AccountTableRow, CreateCompanyDto, UpdateCompanyDto>({
	messages: {
		createSuccess: "سازمان با موفقیت ایجاد شد",
		deleteSuccess: "سازمان با موفقیت حذف شد",
		updateSuccess: "سازمان با موفقیت ویرایش شد",
	},
	queryKey: "accounts",
	service: accountsService,
});
