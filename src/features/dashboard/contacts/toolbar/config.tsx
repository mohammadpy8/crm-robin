import { Kanban, Menu } from "lucide-react";
import { Delete, Organization, Plus, Send, Update } from "@/icons";

const toolbarConfig = {
	actionButtons: [
		{
			icon: <Send className="h-4 w-4 fill-secondary text-transparent" />,
			id: "assign",
			label: "ارجاع به",
			popoverOptions: [
				{ label: "به دست آمده", value: "received" },
				{ label: "سطح پیشرفت", value: "progress1" },
				{ label: "سطح پیشرفت", value: "progress2" },
				{ label: "سطح پیشرفت", value: "progress3" },
			],
			variant: "ghost" as const,
		},

		{
			icon: <Update className="h-4 w-4 fill-secondary text-transparent" />,
			id: "update",
			label: "آپدیت کلی",
			variant: "ghost" as const,
		},
		{
			className: "!bg-red-600 !text-white hover:!bg-red-700",
			icon: <Delete className="h-4 w-4 fill-white text-transparent" />,
			id: "delete",
			label: "حذف",
			variant: "danger" as const,
		},
	],

	createButton: {
		dropdownOptions: [
			{
				label: "ایمپورت از Excel",
				value: "import-excel",
			},
			{
				label: "ایمپورت از CSV",
				value: "import-csv",
			},
			{
				label: "ایجاد گروهی",
				value: "bulk-create",
			},
		],
		icon: <Plus className="h-4 w-4" />,
		label: "ایجاد مخاطب",
	},

	filterButton: {
		defaultLabel: "همه مخاطبین",
		icon: <Menu className="h-4 w-4" />,
		onFilterChange: (value: string, label: string) => {
			console.log("Filter changed:", value, label);
		},
		options: [
			{ label: "همه مخاطبین", value: "all" },
			{ label: "مخاطبین فعال", value: "active" },
			{ label: "مخاطبین غیرفعال", value: "inactive" },
			{ label: "مخاطبین VIP", value: "vip" },
		],
	},

	moreButton: {
		label: "بیشتر",
		options: [
			{
				label: "خروجی Excel",
				onClick: () => console.log("Export to Excel"),
				value: "export-excel",
			},
			{
				label: "خروجی PDF",
				onClick: () => console.log("Export to PDF"),
				value: "export-pdf",
			},
			{
				label: "ایمپورت",
				onClick: () => console.log("Import"),
				value: "import",
			},
		],
	},

	pageTitle: {
		icon: <Organization className="h-7 w-7 fill-primary text-transparent" />,
		title: "مخاطبین",
	},

	showSelectionCount: true,

	viewButtons: [
		{
			active: true,
			href: "/contacts/list",
			icon: <Menu className="h-4 w-4" />,
			id: "list",
			label: "نمایش لیست",
		},
		{
			active: false,
			disabled: true,
			href: "/contacts/kanban",
			icon: <Kanban className="h-4 w-4" />,
			id: "kanban",
			label: "نمایش کاریز",
		},
	],
};

export default toolbarConfig;
