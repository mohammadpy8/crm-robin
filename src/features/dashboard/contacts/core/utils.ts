/** biome-ignore-all lint/style/noNonNullAssertion: <> */
import { useQuery } from "@tanstack/react-query";
import { contactService } from "@/api/services";
import { type ContactEntity, ContactPosition, type UpdateContactDto } from "@/api/types";
import { toJalali } from "@/lib/utils/dateUtils";
import type { ContactFormData, ContactTableRow } from "./types";

export const toTableRow = (contact: ContactEntity): ContactTableRow => ({
	assignedToUserId: contact.assignedToUser?.fullName || "-",
	createdAt: toJalali(contact.createdAt || ""),
	email: contact.email || "",
	firstName: contact.firstName || "",
	id: contact.id,
	lastName: contact.lastName || "",
	phone: contact.phone || "",
	position: contact?.position || ContactPosition.OTHER,
});

export const toFormData = (contact: ContactEntity): ContactFormData => ({
	companyId: contact.companyId ? String(contact.companyId) : undefined,
	email: contact.email,
	firstName: contact.firstName,
	lastName: contact.lastName,
	note: contact.note || "",
	phone: contact.phone,
	position: contact.position,
});

export const toCreatePayload = (data: ContactFormData) => ({
	companyId: data.companyId ? Number(data.companyId) : undefined,
	email: data.email,
	firstName: data.firstName,
	lastName: data.lastName || "",
	note: data.note,
	phone: data.phone || "",
	position: data.position,
});

export const toUpdatePayload = (data: ContactFormData): UpdateContactDto => ({
	companyId: data.companyId ? Number(data.companyId) : undefined,
	email: data.email,
	firstName: data.firstName,
	lastName: data.lastName,
	note: data.note,
	phone: data.phone,
	position: data.position,
});

export const useContactById = (id?: number) => {
	return useQuery({
		enabled: !!id,
		queryFn: () => contactService.getById(id!),
		queryKey: ["contacts", "detail", id],
		staleTime: 0,
	});
};
