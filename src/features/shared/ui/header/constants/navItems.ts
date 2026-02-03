import type { NavItems } from "@/features/shared/ui/header/types/header.types";
import { Contact, Dollar, Home, Users } from "@/icons";

export const navItems: NavItems[] = [
	{ href: "/#dashboard", icon: Home, label: "داشبورد" },
	{ href: "/users/list", icon: Users, label: "کاربران" },
	{ href: "/contacts/list", icon: Contact, label: "مخاطبین" },
	{ href: "/leads/list", icon: Dollar, label: "سرنخ های فروش" },
];
