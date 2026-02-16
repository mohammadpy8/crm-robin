/** biome-ignore-all lint/style/noNonNullAssertion: <> */
import { useQuery } from "@tanstack/react-query";
import { companyService } from "@/api/services";
import type { CompanyEntity, UpdateCompanyDto } from "@/api/types";
import { toJalali } from "@/lib/utils/dateUtils";
import type { AccountFormData, AccountTableRow } from "./types";

export const ITEMS_PER_PAGE = 3;

export const toTableRow = (company: CompanyEntity): AccountTableRow => ({
	assignedToUserId: company.assignedToUser?.fullName || "-",
	createdAt: toJalali(company.createdAt || ""),
	email: company.email || "",
	id: company.id,
	level: company.level || "",
	name: company.name,
	nationalId: company.nationalId,
	phone: company.phone || "",
	status: company.status || "",
	website: "--",
});

export const toFormData = (company: CompanyEntity): AccountFormData => ({
	address: company.address || "",
	assignedToUserId: String(company.assignedToUserId),
	email: company.email,
	level: company.level,
	name: company.name,
	nationalId: company.nationalId,
	note: company.note || "",
	phone: company.phone,
	status: company.status,
});

export const toCreatePayload = (data: AccountFormData) => ({
	address: data.address,
	assignedToUserId: data.assignedToUserId ? Number(data.assignedToUserId) : undefined,
	email: data.email,
	level: data.level,
	name: data.name || "",
	nationalId: data.nationalId || "",
	note: data.note,
	phone: data.phone || "",
	status: data.status,
});

export const toUpdatePayload = (data: AccountFormData): UpdateCompanyDto => ({
	address: data.address,
	assignedToUserId: data.assignedToUserId ? Number(data.assignedToUserId) : undefined,
	email: data.email,
	level: data.level,
	name: data.name,
	nationalId: data.nationalId,
	note: data.note,
	phone: data.phone,
	status: data.status,
});

export const useAccountById = (id?: number) => {
	return useQuery({
		enabled: !!id,
		queryFn: () => companyService.getById(id!),
		queryKey: ["accounts", "detail", id],
		staleTime: 0,
	});
};
