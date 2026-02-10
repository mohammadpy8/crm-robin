// app/users/config/toolbar.config.tsx
/** biome-ignore-all assist/source/useSortedKeys: <> */
import { Kanban, Menu, Plus, Users } from "lucide-react";
import { Delete, Dots } from "@/icons";
import Update from "@/icons/path/Update";

const usersToolbarConfig = {
	// ==================== Action Buttons ====================
	actionButtons: [
		{
			icon: <Update className="h-4 w-4 fill-secondary text-transparent" />,
			id: "bulk-update",
			label: "بروزرسانی کلی",
			variant: "ghost" as const,
			visibility: "any" as const,
			className:
				"focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
		},
		{
			icon: <Dots className="h-4 w-4 fill-white text-transparent" />,
			id: "reset-password",
			label: "بروزرسانی رمز ورود",
			className:
				"bg-secondary/90 text-white items-center hover:bg-secondary focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
			variant: "ghost" as const,
			visibility: "any" as const,
			disableOnMultiple: true,
		},
		{
			icon: <Delete className="h-4 w-4 fill-white text-transparent" />,
			id: "delete",
			label: "حذف",
			variant: "danger" as const,
			className:
				"!bg-red-600 !text-white hover:!bg-red-700 focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
			visibility: "any" as const,
		},
	],

	// ==================== Create Button ====================
	createButton: {
		icon: <Plus className="h-4 w-4" />,
		label: "ایجاد کاربر",
		className:
			"focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
	},

	// ==================== Filter Button ====================
	filterButton: {
		icon: <Menu className="h-4 w-4" />,
		defaultLabel: "همه کاربران",
		options: [
			{ label: "همه کاربران", value: "all" },
			// { label: "کاربران فعال", value: "active" },
			// { label: "کاربران غیرفعال", value: "inactive" },
			// { label: "مدیران", value: "admins" },
			// { label: "کاربران عادی", value: "users" },
		],
	},

	// ==================== More Button ====================
	moreButton: {
		label: "بیشتر",
		options: [
			{
				label: "خروجی Excel",
				value: "export-excel",
			},
			// {
			// 	label: "خروجی PDF",
			// 	value: "export-pdf",
			// },
			// {
			// 	label: "ایمپورت کاربران",
			// 	value: "import-users",
			// },
			// {
			// 	label: "گزارش کاربران",
			// 	value: "users-report",
			// },
		],
	},

	// ==================== Page Title ====================
	pageTitle: {
		icon: <Users className="h-7 w-7 text-primary" />,
		title: "کاربران",
	},

	showSelectionCount: false,
	// ==================== View Buttons ====================
	viewButtons: [
		{
			id: "list",
			label: "نمایش لیست",
			icon: <Menu className="h-4 w-4" />,
			href: "/users/list",
			active: true,
		},
		{
			id: "kanban",
			label: "نمایش کاریز",
			icon: <Kanban className="h-4 w-4" />,
			href: "/users/kanban",
			active: false,
			disabled: true,
		},
	],
};

export default usersToolbarConfig;
