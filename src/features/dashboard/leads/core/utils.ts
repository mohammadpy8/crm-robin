/** biome-ignore-all lint/style/noNonNullAssertion: <> */
import { useQuery } from "@tanstack/react-query";
import { leadService } from "@/api/services";
import type { LeadEntity, LeadSource, LeadStatus, UpdateLeadDto } from "@/api/types";
import { toJalali } from "@/lib/utils/dateUtils";
import type { LeadFormData, LeadTableRow } from "./types";

export const ITEMS_PER_PAGE = 3;

export const toTableRow = (lead: LeadEntity): LeadTableRow => ({
	assignedToUserId: lead.assignedToUser?.fullName || "-",
	company: lead.company || "",
	createdAt: toJalali(lead.createdAt || ""),
	email: lead.email || "",
	firstName: lead.firstName || "",
	id: lead.id,
	lastName: lead.lastName || "",
	phone: lead.phone || "",
	priority: lead.priority || "",
	source: lead.source || ("etc" as LeadSource),
	status: lead.status,
});

export const toFormData = (lead: LeadEntity): LeadFormData => ({
	address: lead.address || "",
	company: lead.company,
	email: lead.email,
	firstName: lead.firstName,
	lastName: lead.lastName,
	note: lead.note || "",
	phone: lead.phone,
	priority: lead.priority,
	source: lead.source,
	status: lead.status,
});

export const toCreatePayload = (data: LeadFormData) => ({
	address: data.address,
	company: data.company,
	email: data.email,
	firstName: data.firstName,
	lastName: data.lastName || "",
	note: data.note,
	phone: data.phone,
	priority: data.priority,
	source: data.source as LeadSource | undefined,
	status: data.status as LeadStatus | undefined,
});

export const toUpdatePayload = (data: LeadFormData): UpdateLeadDto => ({
	address: data.address,
	company: data.company,
	email: data.email,
	firstName: data.firstName,
	lastName: data.lastName,
	note: data.note,
	phone: data.phone,
	priority: data.priority,
	source: data.source as LeadSource | undefined,
	status: data.status as LeadStatus | undefined,
});

export const useLeadById = (id?: number) => {
	return useQuery({
		enabled: !!id,
		queryFn: () => leadService.getById(id!),
		queryKey: ["leads", "detail", id],
		staleTime: 0,
	});
};
