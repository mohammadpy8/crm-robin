"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					mutations: {
						retry: 0,
					},
					queries: {
						gcTime: 10 * 60 * 1000,
						refetchOnWindowFocus: false,
						retry: 1,
						staleTime: 5 * 60 * 1000,
					},
				},
			}),
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
