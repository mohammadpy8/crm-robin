"use client";

import { Suspense, useEffect } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useRoleStore } from "@/store/useRoleStore";
import { UsersFormContainer } from "./form";
import { UsersTableContainer } from "./table";
import UsersToolbarContainer from "./toolbar/Container";

export default function UsersList() {
	const { fetchRoles } = useRoleStore();

	useEffect(() => {
		fetchRoles();
	}, [fetchRoles]);

	return (
		<>
			<UsersFormContainer />

			<ToolbarProvider defaultFilter={{ label: "همه کاربران", value: "all" }}>
				<UsersToolbarContainer />
			</ToolbarProvider>

			<div>
				<Suspense fallback={<div>در حال بارگذاری...</div>}>
					<UsersTableContainer />
				</Suspense>
			</div>
		</>
	);
}
