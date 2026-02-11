import { create } from "zustand";
import { roleService } from "@/api/services/role.service";
import type { RoleOption } from "@/api/types/role.types";

interface RoleStore {
	roles: RoleOption[];
	loading: boolean;
	fetchRoles: () => Promise<void>;
}

export const useRoleStore = create<RoleStore>((set, get) => ({
	fetchRoles: async () => {
		if (get().roles.length > 0) {
			return;
		}

		set({ loading: true });

		try {
			const response = await roleService.getAll();

			const roles: RoleOption[] = response.data.map((role) => ({
				label: role.label || role.name,
				value: String(role.id),
			}));

			set({ loading: false, roles });
		} catch (error) {
			console.error("خطا در دریافت نقش‌ها:", error);
			set({ loading: false, roles: [] });
		}
	},
	loading: false,
	roles: [],
}));
