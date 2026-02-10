"use client";

import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { FilterValue, TableRow } from "../types";

interface TableDataParams {
	page: number;
	itemsPerPage: number;
	sortField: string | null;
	sortOrder: "asc" | "desc" | null;
	filters: Record<string, FilterValue>;
}

interface TableDataResponse {
	data: TableRow[];
	total: number;
}

interface UseTableDataProps {
	queryKey: string[];
	queryFn: (params: TableDataParams) => Promise<TableDataResponse>;
	params: TableDataParams;
	options?: Omit<UseQueryOptions<TableDataResponse>, "queryKey" | "queryFn">;
}

export const useTableData = ({
	queryKey,
	queryFn,
	params,
	options,
}: UseTableDataProps) => {
	return useQuery<TableDataResponse>({
		queryFn: () => queryFn(params),
		queryKey: [...queryKey, params],
		...options,
	});
};
