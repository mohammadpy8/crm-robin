import { useQuery } from "@tanstack/react-query";
import { contactService } from "@/api/services";
import { ContactPosition, type ContactEntity, type UpdateContactDto } from "@/api/types";
import { toJalali } from "@/lib/utils/dateUtils";
import type { ContactFormData, ContactTableRow } from "./types";

export const ITEMS_PER_PAGE = 4;

export const toTableRow = (contact: ContactEntity): ContactTableRow => ({
  id: contact.id,
  firstName: contact.firstName || "",
  lastName: contact.lastName || "",
  phone: contact.phone || "",
  position: contact?.position || ContactPosition.OTHER,
  email: contact.email || "",
  createdAt: toJalali(contact.createdAt || ""),
  assignedToUserId: contact.assignedToUser?.fullName || "-",
});

export const toFormData = (contact: ContactEntity): ContactFormData => ({
  firstName: contact.firstName,
  lastName: contact.lastName,
  phone: contact.phone,
  email: contact.email,
  companyId: contact.companyId ? String(contact.companyId) : undefined,
  position: contact.position,
  note: contact.note || "",
});

export const toCreatePayload = (data: ContactFormData) => ({
  firstName: data.firstName,
  lastName: data.lastName || "",
  phone: data.phone || "",
  email: data.email,
  companyId: data.companyId ? Number(data.companyId) : undefined,
  position: data.position,
  note: data.note,
});

export const toUpdatePayload = (data: ContactFormData): UpdateContactDto => ({
  firstName: data.firstName,
  lastName: data.lastName,
  phone: data.phone,
  email: data.email,
  companyId: data.companyId ? Number(data.companyId) : undefined,
  position: data.position,
  note: data.note,
});

export const useContactById = (id?: number) => {
  return useQuery({
    queryKey: ["contacts", "detail", id],
    queryFn: () => contactService.getById(id!),
    enabled: !!id,
    staleTime: 0,
  });
};
