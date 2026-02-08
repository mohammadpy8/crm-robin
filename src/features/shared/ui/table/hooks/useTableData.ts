"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { TableRow, FilterValue } from "../types";

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
		queryKey: [...queryKey, params],
		queryFn: () => queryFn(params),
		...options,
	});
};
