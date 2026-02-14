import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import { contactService } from "@/api/services";
import type { ContactEntity, CreateContactDto, UpdateContactDto } from "@/api/types";
import type { TableRow } from "@/features/shared/ui/table";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";

export interface UpdateContactPayload {
  data: UpdateContactDto;
}

export const transformContactsToTableRows = (items: ContactEntity[]): TableRow[] =>
  items.map((c) => ({
    id: c.id,
    firstName: c.firstName || "",
    lastName: c.lastName,
    phone: c.phone,
    email: c.email || "",
    position: c.position || "",
    assignTo: c.assignedToUserId ? String(c.assignedToUserId) : "",
    createdAt: c.createdAt,
  }));

const contactsService = {
  getAll: async (params?: BaseQueryParams): Promise<TableRow[]> => {
    const page = Math.max(1, Number(params?.page || 1));
    const limit = Math.max(1, Number(params?.limit || 10));
    const res = await contactService.getAll({ ...params, page, limit });
    return transformContactsToTableRows(res.data);
  },
  create: async (payload: CreateContactDto): Promise<TableRow> => {
    const res = await contactService.create(payload);
    return transformContactsToTableRows([res])[0];
  },
  update: async (id: number, payload: UpdateContactPayload): Promise<TableRow> => {
    const res = await contactService.update(id, payload.data);
    return transformContactsToTableRows([res])[0];
  },
  delete: async (id: number): Promise<void> => {
    await contactService.delete(id);
  },
};

export const {
  useListQuery: useContactsQuery,
  useCreate: useCreateContact,
  useUpdate: useUpdateContact,
  useDelete: useDeleteContact,
  useRefresh: useRefreshContacts,
} = createApiHooks<TableRow, CreateContactDto, UpdateContactPayload>({
  queryKey: "contacts",
  service: contactsService,
  messages: {
    createSuccess: "مخاطب با موفقیت ایجاد شد",
    updateSuccess: "مخاطب با موفقیت ویرایش شد",
    deleteSuccess: "مخاطب با موفقیت حذف شد",
  },
});
