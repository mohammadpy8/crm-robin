"use client";

import { ChevronDown, Kanban, Menu, Plus } from "lucide-react";
import { Delete, Organization, Send } from "@/icons";
import Update from "@/icons/path/Update";
import {
	Toolbar,
	ToolbarProvider,
	useToolbarContext,
} from "../../shared/ui/toolbar/index";

const ContactsPage = () => {
	const toolbarConfig = {
		actionButtons: [
			{
				hasPopover: true,
				icon: <ChevronDown className="h-4 w-4" />,
				id: "change-level",
				label: "تغییر سطح",
				onPopoverConfirm: (selectedValues) => {
					console.log("Selected levels:", selectedValues);
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
				icon: <Update className="h-4 w-4 fill-secondary text-transparent" />,
				id: "update",
				label: "آپدیت کلی",
				onClick: () => console.log("Bulk update"),
				variant: "ghost" as const,
			},
			{
				icon: <Send className="h-4 w-4 fill-secondary text-transparent" />,
				id: "assign",
				label: "ارجاع به",
				onClick: () => console.log("Assign to"),
				variant: "ghost" as const,
			},
			{
				className: "!bg-red-600 !text-white hover:!bg-red-700",
				icon: <Delete className="h-4 w-4 fill-white text-transparent" />,
				id: "delete",
				label: "حذف",
				onClick: () => console.log("Delete selected"),
				variant: "danger" as const,
			},
		],
		// ==================== Create Button (Split Button) ====================
		// مثال 1: با dropdown (دو بخش جدا)
		createButton: {
			dropdownOptions: [
				{
					label: "ایمپورت از Excel",
					onClick: () => console.log("Import from Excel"),
					value: "import-excel",
				},
				{
					label: "ایمپورت از CSV",
					onClick: () => console.log("Import from CSV"),
					value: "import-csv",
				},
				{
					label: "ایجاد گروهی",
					onClick: () => console.log("Bulk create"),
					value: "bulk-create",
				},
			],
			icon: <Plus className="h-4 w-4" />,
			label: "ایجاد مخاطب",
			onClick: () => console.log("Main button clicked - ایجاد مخاطب جدید"), // کلیک روی بخش اصلی
		},

		// مثال 2: بدون dropdown (دکمه ساده)
		// createButton: {
		//   icon: <Plus className="h-4 w-4" />,
		//   label: "ایجاد مخاطب",
		//   onClick: () => console.log("Create contact"),
		// },

		// ==================== Filter Button ====================
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

		// ==================== More Button ====================
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

		// ==================== Page Title ====================
		pageTitle: {
			icon: <Organization className="h-7 w-7 fill-primary text-transparent" />,
			title: "مخاطبین",
		},

		showSelectionCount: true,

		// ==================== View Buttons ====================
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

	return (
		<ToolbarProvider defaultFilter="همه مخاطبین">
			<div>
				<Toolbar config={toolbarConfig} />
				<TableExample />
			</div>
		</ToolbarProvider>
	);
};

// ==================== مثال جدول برای تست ====================

const TableExample = () => {
	const { setSelectedCount } = useToolbarContext();

	const handleSelectionChange = (count: number) => {
		setSelectedCount(count);
	};

	return (
		<div className="mx-auto mt-8 max-w-360 px-10">
			<div className="rounded-lg border border-gray-200 bg-white p-6">
				<h3 className="mb-4 font-semibold text-gray-900 text-lg">
					تست Toolbar با Create Button Options
				</h3>

				<div className="space-y-2">
					<button
						className="w-full rounded-lg border border-gray-200 p-4 text-right transition-colors hover:bg-gray-50"
						onClick={() => handleSelectionChange(0)}
						type="button"
					>
						❌ بدون انتخاب (اکشن‌بار مخفی میشه)
					</button>
					<button
						className="w-full rounded-lg border border-blue-200 bg-blue-50 p-4 text-right transition-colors hover:bg-blue-100"
						onClick={() => handleSelectionChange(3)}
						type="button"
					>
						✅ انتخاب 3 مورد (اکشن‌بار نمایش داده میشه)
					</button>
					<button
						className="w-full rounded-lg border border-green-200 bg-green-50 p-4 text-right transition-colors hover:bg-green-100"
						onClick={() => handleSelectionChange(10)}
						type="button"
					>
						✅ انتخاب 10 مورد
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContactsPage;
