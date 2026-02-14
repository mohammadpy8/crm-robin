"use client";

import { Suspense } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useDebugStore } from "@/hooks/useDebugStore";
import { AccountsForm } from "./components/AccountsForm";
import { AccountsTable } from "./components/AccountsTable";
import { AccountsToolbar } from "./components/AccountsToolbar";
import { useAccountsStore } from "./core/store";

export default function AccountList() {
	useDebugStore("AccountsStore", useAccountsStore);

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
