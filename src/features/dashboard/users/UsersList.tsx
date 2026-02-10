"use client";

import { Suspense } from "react";
import {
	Toolbar,
	ToolbarProvider,
	useToolbarContext,
} from "@/features/shared/ui/toolbar";
import TableBuilderExample from "../accounts/TableExample";
import { UsersFormContainer } from "./form";
import { usersToolbarConfig } from "./toolbar";
import toolbarHandlers from "./toolbar/Handlers";

function UsersContent() {
	const { selectedCount, selectedFilter, setSelectedCount } = useToolbarContext();

	console.log("Selected Filter is:", selectedFilter.value);
	console.log("Selected Count:", selectedCount);
	setSelectedCount(1);

	function onSubmitForm() {
		console.log("form submitted");
	}

	function onCloseForm() {
		console.log("form closed");
	}

	return (
		<>
			<UsersFormContainer isOpen={false} onClose={onCloseForm} onSubmit={onSubmitForm} />

			<div className="w-full">
				<Toolbar config={usersToolbarConfig} handlers={toolbarHandlers} />
			</div>

			<Suspense fallback={<div>در حال بارگذاری...</div>}>
				<TableBuilderExample />
			</Suspense>
		</>
	);
}

export default function UsersList() {
	return (
		<ToolbarProvider defaultFilter={{ label: "همه کاربران", value: "all" }}>
			<UsersContent />
		</ToolbarProvider>
	);
}
