"use client";

import { Suspense } from "react";
import ContactsPage from "@/features/dashboard/contacts/Contact";
import TableBuilderExample from "@/features/shared/ui/tablebuilder/components/TableBuilder";
// import { ContactsFormContainer } from "./form";

export default function ContactsList() {
	// const onSubmitForm = () => {
	// 	console.log("submit contacts form");
	// };

	// const onCloseForm = () => {
	// 	console.log("on close form");
	// };

	return (
		<>
			<ContactsPage />
			{/* <ContactsFormContainer
				isOpen={true}
				onClose={() => onCloseForm()}
				onSubmit={() => onSubmitForm()}
			/> */}
			<Suspense fallback={<div>در حال بارگذاری...</div>}>
				<TableBuilderExample />
			</Suspense>
		</>
	);
}
