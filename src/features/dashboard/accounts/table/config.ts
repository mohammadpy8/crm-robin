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
		header: "شناسه ملی",
		size: 200,
		sortableFieldName: "fullName",
	},
	{
		accessorKey: "lastName",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "نام سازمان",
		size: 200,
		sortableFieldName: "fullName",
	},
	{
		accessorKey: "phone",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "وبسایت",
		size: 200,
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
		accessorKey: "phone",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "سطح",
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
		accessorKey: "phone",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "وضعیت",
		size: 200,
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
	{
		accessorKey: "phone",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "تغییر وضعیت",
		size: 200,
	},
	{
		accessorKey: "phone",
		enableFiltering: true,
		enableSorting: true,
		filterType: "text",
		header: "تغییر وضعیت تعداد",
		size: 200,
	},
];
