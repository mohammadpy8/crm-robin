import { create } from "zustand";
import { authService } from "@/api/services/auth.service";

export interface UserOption {
  label: string;
  value: string;
}

interface UserStore {
  users: UserOption[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  fetchUsers: async () => {
    if (get().users.length > 0) {
      return;
    }

    set({ loading: true });

    try {
      const response = await authService.getUserList();

      const users: UserOption[] = response.map((user) => ({
        label: user.fullName,
        value: String(user.id),
      }));

      set({ loading: false, users });
    } catch (error) {
      console.error("خطا در دریافت کاربران:", error);
      set({ loading: false, users: [] });
    }
  },
  loading: false,
  users: [],
}));
