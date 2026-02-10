import type { ColumnConfig } from "@/features/shared/ui/table";

export const columnConfig: ColumnConfig[] = [
	{
		accessorKey: "phone",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "تلفن",
		size: 140,
		sortableFieldName: "phone",
	},
	{
		accessorKey: "email",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "ایمیل",
		size: 200,
		sortableFieldName: "email",
	},
	{
		accessorKey: "role",
		enableFiltering: true,
		enableSorting: true,
		filterType: "select-multi",
		header: "نقش کاربری",
		selectOptions: [
			{ label: "کارآموز", value: "caramoz" },
			{ label: "ادمین", value: "admin" },
		],
		size: 150,
		sortableFieldName: "position",
	},
	{
		accessorKey: "status",
		badge: {
			active: {
				bgColor: "#10b981",
				label: "فعال",
				textColor: "#ffffff",
				value: "active",
			},
			inactive: {
				bgColor: "#ef4444",
				label: "غیرفعال",
				textColor: "#ffffff",
				value: "inactive",
			},
			pending: {
				bgColor: "#f59e0b",
				label: "در انتظار",
				textColor: "#ffffff",
				value: "pending",
			},
		},
		enableFiltering: true,
		enableSorting: true,
		filterType: "select-single",
		header: "وضعیت",
		selectOptions: [
			{ label: "فعال", value: "active" },
			{ label: "غیرفعال", value: "inactive" },
			{ label: "در انتظار", value: "pending" },
		],
		size: 140,
	},
	{
		accessorKey: "date",
		enableFiltering: true,
		enableSorting: true,
		filterType: "date-range",
		header: "تاریخ ایجاد",
		size: 160,
		sortableFieldName: "createdAt",
	},
];
