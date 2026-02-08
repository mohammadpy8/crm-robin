import type { DateRange } from "./column.types";

export type FilterValue = DateRange | string[] | string;

export interface FilterState {
	[columnId: string]: FilterValue;
}