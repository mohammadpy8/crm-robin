// features/dashboard/users/store/useUsersStore.ts

import { create } from "zustand";
import { authService } from "@/api/services/auth.service";
import type { UserListItem } from "@/api/types";
import type { UserFormData } from "../types";

interface UsersStore {
	users: UserListItem[];
	isLoading: boolean;
	error: string | null;

	isFormOpen: boolean;
	formMode: "create" | "edit" | "view";
	selectedUser: UserFormData | null;
	selectedUserIds: number[];
	currentFilter: string;

	fetchUsers: () => Promise<void>;
	createUser: (data: UserFormData) => Promise<void>;
	updateUser: (id: number, data: UserFormData) => Promise<void>;
	deleteUser: (id: number) => Promise<void>;

	openCreateForm: () => void;
	openEditForm: (user: UserListItem) => void;
	openViewForm: (user: UserListItem) => void;
	closeForm: () => void;
	setSelectedUserIds: (ids: number[]) => void;
	clearSelection: () => void;
	setCurrentFilter: (filter: string) => void;
}

export const useUsersStore = create<UsersStore>((set, get) => ({

	clearSelection: () => {
		set({ selectedUserIds: [] });
	},

	closeForm: () => {
		set({
			isFormOpen: false,
			selectedUser: null,
		});
	},

	// Create User
	createUser: async (data: UserFormData) => {
		set({ error: null, isLoading: true });
		try {
			await authService.signup({
				email: data.email || "",
				fullName: data.fullName || "",
				password: data.password || "",
				phoneNumber: data.mobile || "",
			});
			await get().fetchUsers();
			set({ isFormOpen: false, isLoading: false });
		} catch (error) {
			set({ error: "خطا در ایجاد کاربر", isLoading: false });
			throw error;
		}
	},
	currentFilter: "all",

	// Delete User
	deleteUser: async (id: number) => {
		set({ error: null, isLoading: true });
		try {
			await authService.deleteUser(id);
			await get().fetchUsers();
			get().clearSelection();
			set({ isLoading: false });
		} catch (error) {
			set({ error: "خطا در حذف کاربر", isLoading: false });
			throw error;
		}
	},
	error: null,

	// Fetch Users
	fetchUsers: async () => {
		set({ error: null, isLoading: true });
		try {
			const users = await authService.getUserList();
			set({ isLoading: false, users });
		} catch  {
			set({ error: "خطا در دریافت لیست کاربران", isLoading: false });
		}
	},
	formMode: "create",
	isFormOpen: false,
	isLoading: false,

	// Open Create Form
	openCreateForm: () => {
		set({
			formMode: "create",
			isFormOpen: true,
			selectedUser: null,
		});
	},

	// Open Edit Form
	openEditForm: (user: UserListItem) => {
		set({
			formMode: "edit",
			isFormOpen: true,
			selectedUser: {
				email: "",
				fullName: user.fullName,
				id: String(user.id),
				mobile: "",
				password: "",
			},
		});
	},

	// Open View Form
	openViewForm: (user: UserListItem) => {
		set({
			formMode: "view",
			isFormOpen: true,
			selectedUser: {
				email: "",
				fullName: user.fullName,
				id: String(user.id),
				mobile: "",
				password: "",
			},
		});
	},
	selectedUser: null,
	selectedUserIds: [],

	// Set Current Filter
	setCurrentFilter: (filter: string) => {
		set({ currentFilter: filter });
	},

	// Set Selected User IDs
	setSelectedUserIds: (ids: number[]) => {
		set({ selectedUserIds: ids });
	},

	// Update User
	updateUser: async (id: number, data: UserFormData) => {
		set({ error: null, isLoading: true });
		try {
			await authService.updateUser(id, {
				email: data.email,
				fullName: data.fullName,
				phoneNumber: data.mobile,
			});
			await get().fetchUsers();
			set({ isFormOpen: false, isLoading: false });
		} catch (error) {
			set({ error: "خطا در ویرایش کاربر", isLoading: false });
			throw error;
		}
	},
	// Initial State
	users: [],
}));
