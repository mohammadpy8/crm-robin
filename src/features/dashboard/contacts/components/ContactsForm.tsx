"use client";

import { useCallback } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { ContactsFormConfig } from "../configs/from.config";
import { useCreateContact, useUpdateContact } from "../core/api";
import { useContactsStore } from "../core/store";
import type { ContactFormData } from "../core/types";

export function ContactsForm() {
	const { isFormOpen, formMode, formInitialValues, closeForm } = useContactsStore();
	const createContact = useCreateContact();
	const updateContact = useUpdateContact();

	const handleSubmit = useCallback(
		async (data: ContactFormData) => {
			if (formMode === "create") {
				await createContact.mutateAsync({
					email: data.email,
					firstName: data.organName,
					lastName: data.lastName || "",
					note: data.note,
					phone: data.mobile || "",
				});
			} else if (formMode === "edit" && formInitialValues?.id) {
				await updateContact.mutateAsync({
					id: Number(formInitialValues.id),
					payload: {
						data: {
							email: data.email,
							firstName: data.organName,
							lastName: data.lastName,
							note: data.note,
							phone: data.mobile,
						},
					},
				});
			}
			closeForm();
		},
		[formMode, formInitialValues, createContact, updateContact, closeForm],
	);

	return (
		<FormBuilder<ContactFormData>
			config={ContactsFormConfig}
			initialValues={formInitialValues as ContactFormData}
			isLoading={createContact.isPending || updateContact.isPending}
			isOpen={isFormOpen}
			onClose={closeForm}
			onSubmit={handleSubmit}
		/>
	);
}
