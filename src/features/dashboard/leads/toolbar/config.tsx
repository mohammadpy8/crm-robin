import { ChevronDown, Kanban, Menu, Plus, Users } from "lucide-react";
import { Delete, Dollar, Send } from "@/icons";
import Update from "@/icons/path/Update";

const leadsToolbarConfig = {
	actionButtons: [
		{
			hasPopover: true,
			icon: <ChevronDown className="h-4 w-4" />,
			id: "change-status",
			label: "تغییر وضعیت",
			onPopoverConfirm: () => {
				console.log("Selected levels:");
			},
			popoverOptions: [
				{ label: "به دست آمده", value: "received" },
				{ label: "سطح پیشرفت", value: "progress1" },
				{ label: "سطح پیشرفت", value: "progress2" },
				{ label: "سطح پیشرفت", value: "progress3" },
			],
			variant: "ghost" as const,
		},
		{
			icon: <Send className="h-4 w-4 fill-secondary text-transparent" />,
			id: "assign",
			label: "ارجاع به",
			variant: "ghost" as const,
		},

		{
			className:
				"focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
			icon: <Update className="h-4 w-4 fill-secondary text-transparent" />,
			id: "bulk-update",
			label: "آپدیت کلی",
			variant: "ghost" as const,
			visibility: "any" as const,
		},
		{
			className:
				"!bg-red-600 !text-white hover:!bg-red-700 focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
			icon: <Delete className="h-4 w-4 fill-white text-transparent" />,
			id: "delete",
			label: "حذف",
			variant: "danger" as const,
			visibility: "any" as const,
		},
	],
	createButton: {
		className:
			"focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
		icon: <Plus className="h-4 w-4" />,
		label: "ایجاد سرنخ",
	},

	filterButton: {
		defaultLabel: "همه سرنخ ها",
		icon: <Menu className="h-4 w-4" />,
		options: [
			{ label: "همه سرنخ ها", value: "allLeads" },
			// { label: "کاربران فعال", value: "active" },
			// { label: "کاربران غیرفعال", value: "inactive" },
			// { label: "مدیران", value: "admins" },
			// { label: "کاربران عادی", value: "users" },
		],
	},

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

	pageTitle: {
		icon: <Dollar className="h-7 w-7 text-primary" />,
		title: "سرنخ های فروش",
	},

	showSelectionCount: true,

	viewButtons: [
		{
			active: true,
			href: "/users/list",
			icon: <Menu className="h-4 w-4" />,
			id: "list",
			label: "نمایش لیست",
		},
		{
			active: false,
			disabled: true,
			href: "/users/kanban",
			icon: <Kanban className="h-4 w-4" />,
			id: "kanban",
			label: "نمایش کاریز",
		},
	],
};

export default leadsToolbarConfig;
