import { leadService } from "@/api/services";
import type { CreateLeadDto, LeadEntity, UpdateLeadDto } from "@/api/types";
import type { BaseQueryParams } from "@/features/shared/factories/createApiHooks";
import { createApiHooks } from "@/features/shared/factories/createApiHooks";
import type { TableRow } from "@/features/shared/ui/table";

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
		address: lead.address || "",
		assignTo: lead.assignedToUserId?.toString() || "",
		company: lead.company || "",
		createdAt: lead.createdAt || "",
		email: lead.email || "",
		firstName: lead.firstName || "",
		id: lead.id,
		lastName: lead.lastName || "",
		note: lead.note || "",
		phone: lead.phone || "",
		priority: lead.priority || "",
		source: lead.source || "",
		status: lead.status || "",
		website: "",
	}));

const leadsService = {
	create: async (payload: CreateLeadDto): Promise<TableRow> => {
		const response = await leadService.create(payload);
		return transformLeadsToTableRows([response])[0];
	},

	delete: async (id: number): Promise<void> => {
		await leadService.delete(id);
	},
	getAll: async (params?: BaseQueryParams): Promise<TableRow[]> => {
		const page = params?.page && params.page >= 1 ? Math.floor(params.page) : 1;
		const limit = params?.limit && params.limit >= 1 ? Math.floor(params.limit) : 10;

		const response = await leadService.getAll({
			limit,
			page,
		});

		return transformLeadsToTableRows(response.data);
	},

	update: async (id: number, payload: UpdateLeadPayload): Promise<TableRow> => {
		const updateDto: UpdateLeadDto = {
			address: payload.address,
			assignedToUserId: payload.assignedToUserId,
			company: payload.company,
			email: payload.email,
			firstName: payload.firstName,
			lastName: payload.lastName,
			note: payload.note,
			phone: payload.phone,
			priority: payload.priority,
			source: payload.source as any,
			status: payload.status as any,
		};

		const response = await leadService.update(id, updateDto);
		return transformLeadsToTableRows([response])[0];
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
	messages: {
		createSuccess: "سرنخ با موفقیت ایجاد شد",
		deleteSuccess: "سرنخ با موفقیت حذف شد",
		updateSuccess: "سرنخ با موفقیت ویرایش شد",
	},
	queryKey: "leads",
	retry: 2,
	service: leadsService,
	staleTime: 1000 * 60 * 2,
});
