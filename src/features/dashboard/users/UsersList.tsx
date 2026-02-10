/** biome-ignore-all assist/source/useSortedAttributes: <> */
"use client";

import { Suspense } from "react";
import TableBuilderExample from "@/features/shared/ui/tablebuilder/components/TableBuilder";
import {
	Toolbar,
	ToolbarProvider,
	useToolbarContext,
} from "@/features/shared/ui/toolbar";
import { UsersFormContainer } from "./form";
import { usersToolbarConfig } from "./toolbar";

function UsersContent() {
	const { selectedCount, selectedFilter, setSelectedCount } = useToolbarContext();

	console.log("Selected Filter is:", selectedFilter.value);
	console.log("Selected Count:", selectedCount);

	function onSubmitForm() {
		console.log("form submitted");
	}

	function onCloseForm() {
		console.log("form closed");
	}

	return (
		<>
			<UsersFormContainer isOpen={false} onSubmit={onSubmitForm} onClose={onCloseForm} />

			<div>
				<Toolbar config={usersToolbarConfig} />
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
