"use client";

import { Suspense, useEffect } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useUserStore } from "@/store/useUserStore.";
import { AccountsForm } from "./components/AccountsForm";
import { AccountsTable } from "./components/AccountsTable";
import { AccountsToolbar } from "./components/AccountsToolbar";

export default function AccountList() {
	const { fetchUsers } = useUserStore();
	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<>
			<AccountsForm />
			<ToolbarProvider defaultFilter={{ label: "همه سازمان‌ها", value: "all" }}>
				<AccountsToolbar />
			</ToolbarProvider>
			<Suspense fallback={null}>
				<AccountsTable />
			</Suspense>
		</>
	);
}
