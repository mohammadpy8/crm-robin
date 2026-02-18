import { useQuery } from "@tanstack/react-query";
import { authService } from "@/api/services";
import type { User } from "@/api/types";
import { toJalali } from "@/lib/utils/dateUtils";
import type { UserFormData, UserTableRow } from "./types";


export const toTableRow = (user: User): UserTableRow => ({
	createdAt: toJalali(user.createdAt || ""),
	email: user.email || "",
	fullName: user.fullName || "",
	id: user.id,
	phone: user.phoneNumber || "",
	role: user.role?.label || "-",
});

export const toFormData = (user: User): UserFormData => ({
	email: user.email,
	fullName: user.fullName,
	id: String(user.id),
	mobile: user.phoneNumber,
	password: undefined,
	role: user.role?.id ? String(user.role.id) : undefined,
});

export const useUserById = (id?: number) => {
	return useQuery({
		enabled: !!id,
		queryFn: async () => {
			const response = await authService.getUser();
			const user = response.data.find((u) => u.id === id);
			if (!user) {
				throw new Error("User not found");
			}
			return user;
		},
		queryKey: ["users", "detail", id],
		staleTime: 0,
	});
};
