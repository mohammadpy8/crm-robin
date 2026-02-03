import type { MenuItem } from "@/features/shared/ui/sidebar/types/sidebar.types";
import { Contact, Dollar, Home, Organization, User, Users } from "@/icons";

export const MENU_ITEMS: MenuItem[] = [
	{ href: "/#dashboard", icon: Home, label: "داشبورد" },
	{ href: "/accounts/list", icon: Organization, label: "سازمان ها" },
	{ href: "/contacts/list/", icon: Contact, label: "مخاطبین" },
	{ href: "/users/list", icon: Users, label: "کاربران" },
	{ href: "/leads/list", icon: Dollar, label: "سرنخ های فروش" },
	{ href: "/#profile", icon: User, label: "پروفایل" },
];

export const DEFAULT_USER_PROFILE = {
	avatar: "/images/png/profile.png",
	name: "مهدی حیدری دخت",
	phone: "989136346516",
} as const;
