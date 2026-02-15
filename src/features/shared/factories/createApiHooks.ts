/** biome-ignore-all lint/style/noNonNullAssertion: <> */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getErrorMessage } from "@/api/core/httpClient";
import type { FilterValue } from "@/features/shared/ui/table";
import { showToast } from "@/lib/utils/toast";

export interface BaseQueryParams {
  page?: number;
  limit?: number;
  sortField?: string | null;
  sortOrder?: "asc" | "desc" | null;
  filters?: Record<string, FilterValue>;
  [key: string]: unknown;
}

export interface ApiService<TRow, TCreate = unknown, TUpdate = unknown> {
  getAll: (params?: BaseQueryParams) => Promise<TRow[]>;
  getById?: (id: number) => Promise<TRow>;
  create?: (payload: TCreate) => Promise<TRow>;
  update?: (id: number, payload: TUpdate) => Promise<TRow>;
  delete?: (id: number) => Promise<void>;
}

export interface FactoryConfig<TRow, TCreate = unknown, TUpdate = unknown> {
  queryKey: string;
  service: ApiService<TRow, TCreate, TUpdate>;
  messages?: {
    createSuccess?: string;
    updateSuccess?: string;
    deleteSuccess?: string;
  };
  showErrorToast?: boolean;
  retry?: number;
  retryDelay?: (attemptIndex: number) => number;
  staleTime?: number;
}

export const createQueryKeys = (baseKey: string) => ({
  all: [baseKey] as const,
  detail: (id: number) => [...createQueryKeys(baseKey).details(), id] as const,
  details: () => [...createQueryKeys(baseKey).all, "detail"] as const,
  list: (params?: BaseQueryParams) => [...createQueryKeys(baseKey).lists(), { params }] as const,
  lists: () => [...createQueryKeys(baseKey).all, "list"] as const,
});

export function createApiHooks<TRow, TCreate = unknown, TUpdate = unknown>(
  config: FactoryConfig<TRow, TCreate, TUpdate>,
) {
  const {
    queryKey,
    service,
    messages = {},
    showErrorToast = true,
    retry = 2,
    retryDelay = (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
    staleTime = 1000 * 60 * 2,
  } = config;

  const keys = createQueryKeys(queryKey);

  const toastError = (fallback: string, error: unknown) => {
    const msg = getErrorMessage(error);
    showToast.error(msg || fallback);
  };

  const useListQuery = (params?: BaseQueryParams) => {
    const query = useQuery<TRow[], Error>({
      queryFn: () => service.getAll(params),
      queryKey: keys.list(params),
      retry,
      retryDelay,
      staleTime,
    });

    useEffect(() => {
      if (query.error && showErrorToast) {
        toastError("خطا در دریافت اطلاعات", query.error);
      }
    }, [query.error]);

    return query;
  };

  const useDetailQuery = (id: number, enabled = true) => {
    const query = useQuery<TRow, Error>({
      enabled: enabled && !!service.getById,
      queryFn: () => service.getById!(id),
      queryKey: keys.detail(id),
      retry,
      retryDelay,
      staleTime,
    });

    useEffect(() => {
      if (query.error && showErrorToast) {
        toastError("خطا در دریافت جزئیات", query.error);
      }
    }, [query.error]);

    return query;
  };

  const useCreate = () => {
    const qc = useQueryClient();

    return useMutation({
      mutationFn: (payload: TCreate) => {
        if (!service.create) {
          throw new Error("Create method not implemented in service");
        }
        return service.create(payload);
      },
      onError: (error) => {
        if (showErrorToast) {
          toastError("خطا در ایجاد", error);
        }
      },
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: keys.lists() });
        showToast.success(messages.createSuccess ?? "با موفقیت ایجاد شد");
      },
    });
  };

  const useUpdate = () => {
    const qc = useQueryClient();

    return useMutation({
      mutationFn: ({ id, payload }: { id: number; payload: TUpdate }) => {
        if (!service.update) {
          throw new Error("Update method not implemented in service");
        }
        return service.update(id, payload);
      },
      onError: (error) => {
        if (showErrorToast) {
          toastError("خطا در ویرایش", error);
        }
      },
      onSuccess: (_, { id }) => {
        qc.invalidateQueries({ queryKey: keys.lists() });
        qc.invalidateQueries({ queryKey: keys.detail(id) });
        showToast.success(messages.updateSuccess ?? "با موفقیت ویرایش شد");
      },
    });
  };

  const useDelete = () => {
    const qc = useQueryClient();

    return useMutation({
      mutationFn: (id: number) => {
        if (!service.delete) {
          throw new Error("Delete method not implemented in service");
        }
        return service.delete(id);
      },
      onError: (error) => {
        if (showErrorToast) {
          toastError("خطا در حذف", error);
        }
      },
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: keys.lists() });
        showToast.success(messages.deleteSuccess ?? "با موفقیت حذف شد");
      },
    });
  };

  const useRefresh = () => {
    const qc = useQueryClient();

    return () => {
      qc.invalidateQueries({ queryKey: keys.lists() });
    };
  };

  return {
    keys,
    useCreate,
    useDelete,
    useDetailQuery,
    useListQuery,
    useRefresh,
    useUpdate,
  };
}
