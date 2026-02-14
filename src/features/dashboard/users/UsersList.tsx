"use client";

import { Suspense, useEffect } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useDebugStore } from "@/hooks/useDebugStore";
import { useRoleStore } from "@/store/useRoleStore";
import { UsersForm } from "./components/UsersForm";
import { UsersTable } from "./components/UsersTable";
import { UsersToolbar } from "./components/UsersToolbar";
import { useUsersStore } from "./core/store";

export default function UsersList() {
	const { fetchRoles } = useRoleStore();

	useDebugStore("UsersStore", useUsersStore);

	useEffect(() => {
		fetchRoles();
	}, [fetchRoles]);

	return (
		<>
			<UsersForm />

			<ToolbarProvider defaultFilter={{ label: "همه کاربران", value: "all" }}>
				<UsersToolbar />
			</ToolbarProvider>

			<div>
				<Suspense fallback={null}>
					<UsersTable />
				</Suspense>
			</div>
		</>
	);
}
