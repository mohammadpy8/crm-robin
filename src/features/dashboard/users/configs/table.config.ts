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
		header: "نام و نام خانوادگی",
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
		accessorKey: "createdAt",
		enableFiltering: false,
		enableSorting: false,
		filterType: "date-range",
		header: "تاریخ ایجاد",
		selectOptions: roleOptions,
		size: 150,
	},
];
