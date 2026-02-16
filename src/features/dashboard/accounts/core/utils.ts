import type { CompanyEntity, UpdateCompanyDto } from "@/api/types";
import { toJalali } from "@/lib/utils/dateUtils";
import type { AccountFormData, AccountTableRow } from "./types";
import { useQuery } from "@tanstack/react-query";
import { companyService } from "@/api/services";

export const ITEMS_PER_PAGE = 3;

export const toTableRow = (company: CompanyEntity): AccountTableRow => ({
  id: company.id,
  name: company.name,
  email: company.email || "",
  phone: company.phone || "",
  nationalId: company.nationalId,
  status: company.status || "",
  level: company.level || "",
  assignedToUserId: company.assignedToUser?.fullName || "-",
  createdAt: toJalali(company.createdAt || ""),
  website: "--",
});

export const toFormData = (company: CompanyEntity): AccountFormData => ({
  name: company.name,
  email: company.email,
  phone: company.phone,
  status: company.status,
  level: company.level,
  nationalId: company.nationalId,
  assignedToUserId: String(company.assignedToUserId),
  address: company.address || "",
  note: company.note || "",
});

export const toCreatePayload = (data: AccountFormData) => ({
  name: data.name || "",
  email: data.email,
  phone: data.phone || "",
  nationalId: data.nationalId || "",
  status: data.status,
  level: data.level,
  address: data.address,
  note: data.note,
  assignedToUserId: data.assignedToUserId ? Number(data.assignedToUserId) : undefined,
});

export const toUpdatePayload = (data: AccountFormData): UpdateCompanyDto => ({
  name: data.name,
  email: data.email,
  phone: data.phone,
  nationalId: data.nationalId,
  status: data.status,
  level: data.level,
  address: data.address,
  note: data.note,
  assignedToUserId: data.assignedToUserId ? Number(data.assignedToUserId) : undefined,
});

export const useAccountById = (id?: number) => {
  return useQuery({
    queryKey: ["accounts", "detail", id],
    queryFn: () => companyService.getById(id!),
    enabled: !!id,
    staleTime: 0,
  });
};
