"use client";

import { Suspense } from "react";
import TableBuilderExample from "@/features/shared/ui/tablebuilder/components/TableBuilder";
import { ContactsFormContainer } from "./form";

export default function ContactsList() {
	const onSubmitForm = () => {
		console.log("submit contacts form");
	};

	const onCloseForm = () => {
		console.log("on close form");
	};

	return (
		<Suspense fallback={<div>در حال بارگذاری...</div>}>
			<ContactsFormContainer
				isOpen={true}
				onClose={() => onCloseForm()}
				onSubmit={() => onSubmitForm()}
			/>
			<TableBuilderExample />
		</Suspense>
	);
}
