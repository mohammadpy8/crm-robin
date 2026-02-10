"use client";

import { Suspense } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { UsersFormContainer } from "./form";
import { UsersTableContainer } from "./table";
import UsersToolbarContainer from "./toolbar/Container";

export default function UsersList() {
	function onSubmitForm() {
		console.log("form submitted");
	}

	function onCloseForm() {
		console.log("form closed");
	}

	return (
		<>
			<UsersFormContainer
				initialValues={{ email: "maliasadi@gmail.com" }}
				isOpen={false}
				onClose={onCloseForm}
				onSubmit={onSubmitForm}
			/>

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
