"use client";

import { useCallback, useEffect } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useUserStore } from "@/store/useUserStore.";
import { getAccountsFormConfig } from "../configs/form.config";
import { useCreateAccount, useUpdateAccount } from "../core/api";
import { useAccountById } from "../core/hooks";
import { useAccountsStore } from "../core/store";
import type { AccountFormData } from "../core/types";

export function AccountsForm() {
	const { isFormOpen, formMode, formInitialValues, closeForm } = useAccountsStore();
	const { users, loading: usersLoading, fetchUsers } = useUserStore();
	const createAccount = useCreateAccount();
	const updateAccount = useUpdateAccount();

  const editId = formMode === "edit" && formInitialValues?.id 
	? Number(formInitialValues.id) 
	: undefined;
  const { data: accountData, isLoading: isLoadingAccount } = useAccountById(editId);


	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const accountsFormConfig = getAccountsFormConfig(users, usersLoading);

	const getInitialValues = (): AccountFormData | undefined => {
		if (formMode === "edit" && accountData) {
			return accountData;
		}
		if (formMode === "create") {
			return;
		}
		return formInitialValues as AccountFormData;
	};

	const handleSubmit = useCallback(
		async (data: AccountFormData) => {
			if (formMode === "create") {
				await createAccount.mutateAsync({
					address: data.address,
					assignedToUserId: Number(data.assignedToUserId),
					email: data.email,
					level: data.level,
					name: data.name || "",
					nationalId: data.nationalId || "",
					note: data.note,
					phone: data.phone || "",
					status: data.status,
				});
			} else if (formMode === "edit" && formInitialValues?.id) {
				await updateAccount.mutateAsync({
					id: Number(formInitialValues.id),
					payload: {
						data: {
							address: data.address,
							assignedToUserId: Number(data.assignedToUserId),
							email: data.email,
							level: data.level,
							name: data.name,
							nationalId: data.nationalId,
							note: data.note,
							phone: data.phone,
							status: data.status,
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
