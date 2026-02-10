// app/users/config/toolbar.config.tsx
/** biome-ignore-all assist/source/useSortedKeys: <> */
import { ChevronDown, Kanban, Menu, Plus, Users } from "lucide-react";
import { Apps, Delete } from "@/icons";
import Update from "@/icons/path/Update";

const usersToolbarConfig = {
	// ==================== Action Buttons ====================
	actionButtons: [
		{
			icon: <ChevronDown className="h-4 w-4" />,
			id: "assign-to",
			label: "ارجاع به",
			hasPopover: true,
			popoverOptions: [
				{ label: "مدیر سیستم", value: "admin" },
				{ label: "مدیر فروش", value: "sales-manager" },
				{ label: "پشتیبانی", value: "support" },
				{ label: "مالی", value: "finance" },
			],
			onPopoverConfirm: (selectedValues: string[]) => {
				console.log("Assigned to:", selectedValues);
			},
			variant: "ghost" as const,
		},
		{
			icon: <Update className="h-4 w-4 fill-secondary text-transparent" />,
			id: "bulk-update",
			label: "بروزرسانی کلی",
			onClick: () => console.log("Bulk update users"),
			variant: "ghost" as const,
		},
		{
			icon: <Apps className="h-4 w-4 fill-secondary text-transparent" />,
			id: "reset-password",
			label: "بروزرسانی رمز ورود",
			onClick: () => console.log("Reset passwords"),
			variant: "ghost" as const,
		},
		{
			icon: <Delete className="h-4 w-4 fill-white text-transparent" />,
			id: "delete",
			label: "حذف",
			onClick: () => console.log("Delete selected users"),
			variant: "danger" as const,
			className: "!bg-red-600 !text-white hover:!bg-red-700",
		},
	],

	// ==================== Create Button ====================
	createButton: {
		icon: <Plus className="h-4 w-4" />,
		label: "ایجاد کاربر",
		onClick: () => console.log("Create new user"),
	},

	// ==================== Filter Button ====================
	filterButton: {
		icon: <Menu className="h-4 w-4" />,
		defaultLabel: "همه کاربران",
		options: [
			{ label: "همه کاربران", value: "all" },
			{ label: "کاربران فعال", value: "active" },
			{ label: "کاربران غیرفعال", value: "inactive" },
			{ label: "مدیران", value: "admins" },
			{ label: "کاربران عادی", value: "users" },
		],
		onFilterChange: (value: string, label: string) => {
			console.log("Filter changed:", value , label);
		},
	},

	// ==================== More Button ====================
	moreButton: {
		label: "بیشتر",
		options: [
			{
				label: "خروجی Excel",
				value: "export-excel",
				onClick: () => console.log("Export users to Excel"),
			},
			{
				label: "خروجی PDF",
				value: "export-pdf",
				// onClick: () => console.log("Export users to PDF"),
			},
			{
				label: "ایمپورت کاربران",
				value: "import-users",
				onClick: () => console.log("Import users"),
			},
			{
				label: "گزارش کاربران",
				value: "users-report",
				onClick: () => console.log("Generate users report"),
			},
		],
	},

	// ==================== Page Title ====================
	pageTitle: {
		icon: <Users className="h-7 w-7 text-primary" />,
		title: "کاربران",
	},

	showSelectionCount: true,

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