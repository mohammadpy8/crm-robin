"use client";

import { useCallback } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { AccountsFormConfig } from "../configs/form.config";
import { useCreateAccount, useUpdateAccount } from "../core/api";
import { useAccountsStore } from "../core/store";
import type { AccountFormData } from "../core/types";

export function AccountsForm() {
	const { isFormOpen, formMode, formInitialValues, closeForm } = useAccountsStore();
	const createAccount = useCreateAccount();
	const updateAccount = useUpdateAccount();

	const handleSubmit = useCallback(
		async (data: AccountFormData) => {
			if (formMode === "create") {
				await createAccount.mutateAsync({
					address: data.address,
					email: data.email,
					name: data.organName || "",
					nationalId: data.nationalId || "",
					note: data.note,
					phone: data.mobile || "",
				});
			} else if (formMode === "edit" && formInitialValues?.id) {
				await updateAccount.mutateAsync({
					id: Number(formInitialValues.id),
					payload: {
						data: {
							address: data.address,
							email: data.email,
							name: data.organName,
							nationalId: data.nationalId,
							note: data.note,
							phone: data.mobile,
						},
					},
				});
			}
			closeForm();
		},
		[formMode, formInitialValues, createAccount, updateAccount, closeForm],
	);

	return (
		<FormBuilder<AccountFormData>
			config={AccountsFormConfig}
			initialValues={formInitialValues as AccountFormData}
			isLoading={createAccount.isPending || updateAccount.isPending}
			isOpen={isFormOpen}
			onClose={closeForm}
			onSubmit={handleSubmit}
		/>
	);
}
