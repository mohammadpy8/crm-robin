// src/features/dashboard/leads/core/api.ts
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import { leadService } from "@/api/services";
import type { CreateLeadDto, LeadEntity, UpdateLeadDto } from "@/api/types";
import type { TableRow } from "@/features/shared/ui/table";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";

export interface UpdateLeadPayload {
  firstName?: string;
  lastName?: string;
  status?: string;
  source?: string;
  priority?: string;
  company?: string;
  note?: string;
  address?: string;
  phone?: string;
  email?: string;
  assignedToUserId?: number;
}

export const transformLeadsToTableRows = (leads: LeadEntity[]): TableRow[] =>
  leads.map((lead) => ({
    id: lead.id,
    firstName: lead.firstName || "",
    lastName: lead.lastName || "",
    phone: lead.phone || "",
    email: lead.email || "",
    status: lead.status || "",
    source: lead.source || "",
    priority: lead.priority || "",
    company: lead.company || "",
    address: lead.address || "",
    note: lead.note || "",
    website: "",
    assignTo: lead.assignedToUserId?.toString() || "",
    createdAt: lead.createdAt || "",
  }));

const leadsService = {
  getAll: async (params?: BaseQueryParams): Promise<TableRow[]> => {
    // اطمینان از اینکه مقادیر معتبر هستند
    const page = params?.page && params.page >= 1 ? Math.floor(params.page) : 1;
    const limit = params?.limit && params.limit >= 1 ? Math.floor(params.limit) : 10;

    const response = await leadService.getAll({
      page,
      limit,
    });

    return transformLeadsToTableRows(response.data);
  },

  create: async (payload: CreateLeadDto): Promise<TableRow> => {
    const response = await leadService.create(payload);
    return transformLeadsToTableRows([response])[0];
  },

  update: async (id: number, payload: UpdateLeadPayload): Promise<TableRow> => {
    const updateDto: UpdateLeadDto = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      status: payload.status as any,
      source: payload.source as any,
      priority: payload.priority,
      company: payload.company,
      note: payload.note,
      address: payload.address,
      phone: payload.phone,
      email: payload.email,
      assignedToUserId: payload.assignedToUserId,
    };

    const response = await leadService.update(id, updateDto);
    return transformLeadsToTableRows([response])[0];
  },

  delete: async (id: number): Promise<void> => {
    await leadService.delete(id);
  },
};

export const {
  keys: leadKeys,
  useListQuery: useLeadsQuery,
  useCreate: useCreateLead,
  useUpdate: useUpdateLead,
  useDelete: useDeleteLead,
  useRefresh: useRefreshLeads,
} = createApiHooks<TableRow, CreateLeadDto, UpdateLeadPayload>({
  queryKey: "leads",
  service: leadsService,
  messages: {
    createSuccess: "سرنخ با موفقیت ایجاد شد",
    updateSuccess: "سرنخ با موفقیت ویرایش شد",
    deleteSuccess: "سرنخ با موفقیت حذف شد",
  },
  retry: 2,
  staleTime: 1000 * 60 * 2,
});
