import type { DateObject } from "react-multi-date-picker";

export type FilterType = "date-range" | "select-multi" | "select-single" | "text";

export interface SelectOption {
	value: string;
	label: string;
}

export interface BadgeConfig {
	[key: string]: {
		value: string;
		label: string;
		bgColor: string;
		textColor: string;
	};
}

export interface ColumnConfig {
	accessorKey: string;
	badge?: BadgeConfig;
	cell?: (value: string | undefined) => React.ReactNode;
	enableFiltering?: boolean;
	enableSorting?: boolean;
	filterType?: FilterType;
	header: string;
	selectOptions?: SelectOption[];
	size?: number;
	sortableFieldName?: string;
}

export type DateRange = [DateObject | null, DateObject | null] | null;
