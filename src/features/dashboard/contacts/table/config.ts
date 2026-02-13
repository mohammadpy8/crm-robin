import type { ColumnConfig } from "@/features/shared/ui/table";

type RoleOption = {
	label: string;
	value: string;
};

export const getLeadsColumnConfig = (roleOptions: RoleOption[]): ColumnConfig[] => [
	{
		accessorKey: "firstName",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "نام",
		size: 200,
		sortableFieldName: "fullName",
	},
	{
		accessorKey: "lastName",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "نام خانوادگی",
		size: 200,
		sortableFieldName: "fullName",
	},
	{
		accessorKey: "phone",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "تلفن",
		size: 200,
	},
	{
		accessorKey: "position",
		enableFiltering: true,
		enableSorting: true,
		filterType: "select-single",
		header: "موقعیت در سازمان",
		size: 200,
	},
	{
		accessorKey: "email",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "ایمیل",
		size: 250,
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
	{
		accessorKey: "assignTo",
		enableFiltering: true,
		enableSorting: false,
		filterType: "select-single",
		header: "ارجاع به",
		size: 200,
	},
];
