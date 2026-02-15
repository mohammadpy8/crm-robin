import { useQuery } from "@tanstack/react-query";
import { accountsService } from "./api";

export const useAccountById = (id?: number) => {
	return useQuery({
		enabled: !!id,
		queryFn: () => accountsService.getById(id!),
		queryKey: ["accounts", "detail", id],
		staleTime: 0,
	});
};
