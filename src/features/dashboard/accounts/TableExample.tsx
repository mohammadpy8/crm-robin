import { useCallback, useState } from "react";
import {
	type ColumnConfig,
	type FilterValue,
	TableBuilder,
	type TableRow,
} from "@/features/shared/ui/table";

export default function TableBuilderExample() {
	const [mockData] = useState<TableRow[]>([
		{
			date: "1403/11/11",
			email: "virzcell@gmail.com",
			id: 1,
			name: "مهدی حیدری دخت",
			phone: "+980215686868",
			role: "مدیر",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "mina.irani@gmail.com",
			id: 2,
			name: "نگارش سبز",
			phone: "+980217854785",
			role: "کارمند",
			status: "inactive",
		},
		{
			date: "1403/11/11",
			email: "",
			id: 3,
			name: "مشاور آنلاین",
			phone: "02132121121",
			role: "مشاور",
			status: "pending",
		},
		{
			date: "1403/11/11",
			email: "info@rahesabz.com",
			id: 4,
			name: "نگار راه سبز",
			phone: "03133352545",
			role: "کارمند",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "info@pardazco.com",
			id: 5,
			name: "ایده پرداز",
			phone: "0217212122",
			role: "مدیر",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "",
			id: 6,
			name: "درایب استودیو",
			phone: "09309262872",
			role: "کارآموز",
			status: "inactive",
		},
		{
			date: "1403/11/11",
			email: "samanbime@gmail.com",
			id: 7,
			name: "بیمه سامان",
			phone: "0212252625",
			role: "کارمند",
			status: "pending",
		},
		{
			date: "1403/11/11",
			email: "info@hoshmand.com",
			id: 8,
			name: "هوشمند سازان فناور",
			phone: "0214424243",
			role: "مشاور",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "info@mobailgostar.com",
			id: 9,
			name: "موبایل گستر ایران",
			phone: "0213212525",
			role: "کارمند",
			status: "inactive",
		},
		{
			date: "1403/11/11",
			email: "info@borna.com",
			id: 10,
			name: "برنا ایده پرداز",
			phone: "0215857585",
			role: "مدیر",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "rashin@gmail.com",
			id: 11,
			name: "سخت افزار راشین",
			phone: "0313253525",
			role: "کارمند",
			status: "pending",
		},
		{
			date: "1403/11/11",
			email: "zabandidar@gmail.com",
			id: 12,
			name: "آموزشگاه زبان دیدار",
			phone: "0315454546",
			role: "مشاور",
			status: "active",
		},
		{
			date: "1403/11/11",
			email: "golriz@gmail.com",
			id: 13,
			name: "آموزشگاه گلریز",
			phone: "0219989887",
			role: "کارآموز",
			status: "inactive",
		},
	]);

	const columnConfig: ColumnConfig[] = [
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
			// selectOptions: ["مدیر", "کارمند", "مشاور", "کارآموز"],
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
			// selectOptions: ["فعال", "غیرفعال", "در انتظار"],
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

	const handleFilterChange = useCallback((filters: Record<string, FilterValue>): void => {
		console.log("🎯 Filter Change:", filters);
	}, []);

	const handleSortChange = useCallback(
		(sortField: string | null, sortOrder: "asc" | "desc" | null): void => {
			console.log("📊 Sort Change:", { sortField, sortOrder });
		},
		[],
	);

	const handleEdit = useCallback((row: TableRow): void => {
		console.log("✏️ Edit row:", row);
	}, []);

	const handleView = useCallback((row: TableRow): void => {
		console.log("👁️ View row:", row);
	}, []);

	const handleSelectionChange = useCallback((selectedIds: number[]): void => {
		console.log("✅ Selected IDs:", selectedIds);
	}, []);

	return (
		<TableBuilder
			columns={columnConfig}
			data={mockData}
			itemsPerPage={1}
			multiSelect={false}
			onFilterChange={handleFilterChange}
			onRowEdit={handleEdit}
			onRowView={handleView}
			onSelectionChange={handleSelectionChange}
			onSortChange={handleSortChange}
		/>
	);
}
