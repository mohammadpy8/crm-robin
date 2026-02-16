import { contactService } from "@/api/services";
import type { CreateContactDto, UpdateContactDto } from "@/api/types";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import { useContactsStore } from "./store";
import type { ContactTableRow } from "./types";
import { ITEMS_PER_PAGE, toTableRow } from "./utils";

const contactsService = {
  getAll: async (params?: BaseQueryParams): Promise<ContactTableRow[]> => {
    const page = Math.max(1, Number(params?.page ?? 1));
    const limit = ITEMS_PER_PAGE;

    const cleanParams: Record<string, any> = {
      page,
      limit,
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

  create: async (payload: CreateContactDto): Promise<ContactTableRow> => {
    const contact = await contactService.create(payload);
    return toTableRow(contact);
  },

  update: async (id: number, payload: UpdateContactDto): Promise<ContactTableRow> => {
    const contact = await contactService.update(id, payload);
    return toTableRow(contact);
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
} = createApiHooks<ContactTableRow, CreateContactDto, UpdateContactDto>({
  queryKey: "contacts",
  service: contactsService,
  messages: {
    createSuccess: "مخاطب با موفقیت ایجاد شد",
    updateSuccess: "مخاطب با موفقیت ویرایش شد",
    deleteSuccess: "مخاطب با موفقیت حذف شد",
  },
});