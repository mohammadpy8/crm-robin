import type { ColumnConfig } from "@/features/shared/ui/table";

type RoleOption = {
	label: string;
	value: string;
};

export const getUsersColumnConfig = (roleOptions: RoleOption[]): ColumnConfig[] => [
	{
		accessorKey: "fullName",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "نام کامل",
		size: 200,
		sortableFieldName: "fullName",
	},
	{
		accessorKey: "phone",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "تلفن",
		size: 140,
	},
	{
		accessorKey: "email",
		enableFiltering: true,
		enableSorting: false,
		filterType: "text",
		header: "ایمیل",
		size: 200,
	},
	{
		accessorKey: "role",
		enableFiltering: false,
		enableSorting: false,
		filterType: "select-single",
		header: "نقش کاربری",
		selectOptions: roleOptions,
		size: 150,
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
		},
		enableFiltering: false,
		enableSorting: false,
		filterType: "select-single",
		header: "وضعیت",
		size: 140,
	},
	{
		accessorKey: "createdAt",
		enableFiltering: false,
		enableSorting: true,
		filterType: "date-range",
		header: "تاریخ ایجاد",
		selectOptions: roleOptions,
		size: 150,
	},
];
