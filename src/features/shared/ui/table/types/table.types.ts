import type { ColumnConfig } from "./column.types";
import type { FilterValue } from "./filter.types";

export interface TableRow {
	date: string;
	email: string;
	id: number;
	name: string;
	phone: string;
	role: string;
	status?: string;
	[key: string]: string | number | undefined;
}

export interface TableBuilderProps {
	columns: ColumnConfig[];
	data: TableRow[];
	itemsPerPage?: number;
	loading?: boolean;
	multiSelect?: boolean;
	onFilterChange?: (filters: Record<string, FilterValue>) => void;
	onPageChange?: (page: number) => void;
	onRowEdit?: (row: TableRow) => void;
	onRowView?: (row: TableRow) => void;
	onSelectionChange?: (selectedIds: number[]) => void;
	onSortChange?: (sortField: string | null, sortOrder: "asc" | "desc" | null) => void;
	totalItems?: number;
	currentPage?: number;
}
