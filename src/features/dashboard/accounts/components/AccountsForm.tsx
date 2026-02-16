"use client";

import { useCallback } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useUserStore } from "@/store/useUserStore.";
import { getAccountsFormConfig } from "../configs/form.config";
import { useCreateAccount, useUpdateAccount } from "../core/api";
import { useAccountsStore } from "../core/store";
import type { AccountFormData } from "../core/types";
import {
	toCreatePayload,
	toFormData,
	toUpdatePayload,
	useAccountById,
} from "../core/utils";

export function AccountsForm() {
	const { isFormOpen, formMode, formInitialValues, closeForm } = useAccountsStore();
	const { users, loading: usersLoading } = useUserStore();
	const createAccount = useCreateAccount();
	const updateAccount = useUpdateAccount();
	const editId =
		formMode === "edit" && formInitialValues?.id
			? Number(formInitialValues.id)
			: undefined;
	const { data: accountData, isLoading: isLoadingAccount } = useAccountById(editId);
	const accountsFormConfig = getAccountsFormConfig(users, usersLoading);

	const getInitialValues = (): AccountFormData | undefined => {
		if (formMode === "edit" && accountData) {
			return toFormData(accountData);
		}
		if (formMode === "create") {
			return;
		}
		return formInitialValues as AccountFormData;
	};

	const handleSubmit = useCallback(
		async (data: AccountFormData) => {
			if (formMode === "create") {
				await createAccount.mutateAsync(toCreatePayload(data));
			} else if (formMode === "edit" && editId) {
				await updateAccount.mutateAsync({
					id: editId,
					payload: toUpdatePayload(data),
				});
			}
			closeForm();
		},
		[formMode, editId, createAccount, updateAccount, closeForm],
	);

	return (
		<FormBuilder<AccountFormData>
			config={accountsFormConfig}
			initialValues={getInitialValues()}
			isLoading={
				createAccount.isPending ||
				updateAccount.isPending ||
				usersLoading ||
				(formMode === "edit" && isLoadingAccount)
			}
			isOpen={isFormOpen}
			key={`${formMode}-${editId || "new"}`}
			onClose={closeForm}
			onSubmit={handleSubmit}
		/>
	);
}
