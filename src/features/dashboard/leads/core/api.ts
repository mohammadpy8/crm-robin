import { leadService } from "@/api/services";
import type { CreateLeadDto, UpdateLeadDto } from "@/api/types";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import { useLeadsStore } from "./store";
import type { LeadTableRow } from "./types";
import { ITEMS_PER_PAGE, toTableRow } from "./utils";

const leadsService = {
  getAll: async (params?: BaseQueryParams): Promise<LeadTableRow[]> => {
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

    const response = await leadService.getAll(cleanParams);

    useLeadsStore.getState().setTotalItems(response.total);

    return response.data.map(toTableRow);
  },

  create: async (payload: CreateLeadDto): Promise<LeadTableRow> => {
    const lead = await leadService.create(payload);
    return toTableRow(lead);
  },

  update: async (id: number, payload: UpdateLeadDto): Promise<LeadTableRow> => {
    const lead = await leadService.update(id, payload);
    return toTableRow(lead);
  },

  delete: async (id: number): Promise<void> => {
    await leadService.delete(id);
  },
};

export const {
  useListQuery: useLeadsQuery,
  useCreate: useCreateLead,
  useUpdate: useUpdateLead,
  useDelete: useDeleteLead,
  useRefresh: useRefreshLeads,
} = createApiHooks<LeadTableRow, CreateLeadDto, UpdateLeadDto>({
  queryKey: "leads",
  service: leadsService,
  messages: {
    createSuccess: "سرنخ با موفقیت ایجاد شد",
    updateSuccess: "سرنخ با موفقیت ویرایش شد",
    deleteSuccess: "سرنخ با موفقیت حذف شد",
  },
});
