/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { contactService } from "@/api/services";
import type { CreateContactDto, UpdateContactDto } from "@/api/types";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import { useContactsStore } from "./store";
import type { ContactTableRow } from "./types";
import {  toTableRow } from "./utils";

const contactsService = {
	create: async (payload: CreateContactDto): Promise<ContactTableRow> => {
		const contact = await contactService.create(payload);
		return toTableRow(contact);
	},

	delete: async (id: number): Promise<void> => {
		await contactService.delete(id);
	},
	getAll: async (params?: BaseQueryParams): Promise<ContactTableRow[]> => {
		const page = Math.max(1, Number(params?.page ?? 1));
		const limit = Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE);

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

		const response = await contactService.getAll(cleanParams);

		useContactsStore.getState().setTotalItems(response.total);

		return response.data.map(toTableRow);
	},

	update: async (id: number, payload: UpdateContactDto): Promise<ContactTableRow> => {
		const contact = await contactService.update(id, payload);
		return toTableRow(contact);
	},
};

export const {
	useListQuery: useContactsQuery,
	useCreate: useCreateContact,
	useUpdate: useUpdateContact,
	useDelete: useDeleteContact,
	useRefresh: useRefreshContacts,
} = createApiHooks<ContactTableRow, CreateContactDto, UpdateContactDto>({
	messages: {
		createSuccess: "مخاطب با موفقیت ایجاد شد",
		deleteSuccess: "مخاطب با موفقیت حذف شد",
		updateSuccess: "مخاطب با موفقیت ویرایش شد",
	},
	queryKey: "contacts",
	service: contactsService,
});
