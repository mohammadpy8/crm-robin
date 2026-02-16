import { useQuery } from "@tanstack/react-query";
import { leadService } from "@/api/services";
import type { LeadEntity, UpdateLeadDto, LeadStatus, LeadSource } from "@/api/types";
import { toJalali } from "@/lib/utils/dateUtils";
import type { LeadFormData, LeadTableRow } from "./types";

export const ITEMS_PER_PAGE = 3;

export const toTableRow = (lead: LeadEntity): LeadTableRow => ({
  id: lead.id,
  firstName: lead.firstName || "",
  lastName: lead.lastName || "",
  phone: lead.phone || "",
  email: lead.email || "",
  status: lead.status,
  source: lead.source || ("etc" as LeadSource),
  priority: lead.priority || "",
  company: lead.company || "",
  createdAt: toJalali(lead.createdAt || ""),
  assignedToUserId: lead.assignedToUser?.fullName || "-",
});

export const toFormData = (lead: LeadEntity): LeadFormData => ({
  firstName: lead.firstName,
  lastName: lead.lastName,
  phone: lead.phone,
  email: lead.email,
  status: lead.status,
  source: lead.source,
  priority: lead.priority,
  company: lead.company,
  address: lead.address || "",
  note: lead.note || "",
});

export const toCreatePayload = (data: LeadFormData) => ({
  firstName: data.firstName,
  lastName: data.lastName || "",
  phone: data.phone,
  email: data.email,
  status: data.status as LeadStatus | undefined,
  source: data.source as LeadSource | undefined,
  priority: data.priority,
  company: data.company,
  address: data.address,
  note: data.note,
});

export const toUpdatePayload = (data: LeadFormData): UpdateLeadDto => ({
  firstName: data.firstName,
  lastName: data.lastName,
  phone: data.phone,
  email: data.email,
  status: data.status as LeadStatus | undefined,
  source: data.source as LeadSource | undefined,
  priority: data.priority,
  company: data.company,
  address: data.address,
  note: data.note,
});

export const useLeadById = (id?: number) => {
  return useQuery({
    queryKey: ["leads", "detail", id],
    queryFn: () => leadService.getById(id!),
    enabled: !!id,
    staleTime: 0,
  });
};