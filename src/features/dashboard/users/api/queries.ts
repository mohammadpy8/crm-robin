import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getErrorMessage } from "@/api/core/httpClient";
import type { TableRow } from "@/features/shared/ui/table";
import { showToast } from "@/lib/utils/toast";
import { fetchUsers } from "./fetchers";
import { userKeys } from "./keys";

export const useUsersQuery = () => {
	const query = useQuery<TableRow[], Error>({
		queryFn: fetchUsers,
		queryKey: userKeys.lists(),
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
		staleTime: 1000 * 60 * 2,
	});

	useEffect(() => {
		if (query.error) {
			const errorMessage = getErrorMessage(query.error);
			showToast.error(`خطا در دریافت لیست کاربران: ${errorMessage}`);
		}
	}, [query.error]);

	return {
		...query,
		isFetching: query.isFetching,
	};
};
