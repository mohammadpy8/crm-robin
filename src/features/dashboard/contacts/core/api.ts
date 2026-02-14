import { contactService } from "@/api/services";
import type { ContactEntity, CreateContactDto, UpdateContactDto } from "@/api/types";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import type { TableRow } from "@/features/shared/ui/table";

export interface UpdateContactPayload {
	data: UpdateContactDto;
}

export const transformContactsToTableRows = (items: ContactEntity[]): TableRow[] =>
	items.map((c) => ({
		assignTo: c.assignedToUserId ? String(c.assignedToUserId) : "",
		createdAt: c.createdAt,
		email: c.email || "",
		firstName: c.firstName || "",
		id: c.id,
		lastName: c.lastName,
		phone: c.phone,
		position: c.position || "",
	}));

const contactsService = {
	create: async (payload: CreateContactDto): Promise<TableRow> => {
		const res = await contactService.create(payload);
		return transformContactsToTableRows([res])[0];
	},
	delete: async (id: number): Promise<void> => {
		await contactService.delete(id);
	},
	getAll: async (params?: BaseQueryParams): Promise<TableRow[]> => {
		const page = Math.max(1, Number(params?.page || 1));
		const limit = Math.max(1, Number(params?.limit || 10));
		const res = await contactService.getAll({ ...params, limit, page });
		return transformContactsToTableRows(res.data);
	},
	update: async (id: number, payload: UpdateContactPayload): Promise<TableRow> => {
		const res = await contactService.update(id, payload.data);
		return transformContactsToTableRows([res])[0];
	},
};

export const {
	useListQuery: useContactsQuery,
	useCreate: useCreateContact,
	useUpdate: useUpdateContact,
	useDelete: useDeleteContact,
	useRefresh: useRefreshContacts,
} = createApiHooks<TableRow, CreateContactDto, UpdateContactPayload>({
	messages: {
		createSuccess: "مخاطب با موفقیت ایجاد شد",
		deleteSuccess: "مخاطب با موفقیت حذف شد",
		updateSuccess: "مخاطب با موفقیت ویرایش شد",
	},
	queryKey: "contacts",
	service: contactsService,
});
