import { useQuery } from "@tanstack/react-query";
import { accountsService } from "./api";

export const useAccountById = (id: number | null) => {
  return useQuery({
    queryKey: ["accounts", "detail", id],
    queryFn: () => accountsService.getById(id!),
    enabled: !!id,
    staleTime: 0,
  });
};
