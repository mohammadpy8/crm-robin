"use client";

import { useCallback, useEffect } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { getAccountsFormConfig } from "../configs/form.config";
import { useCreateAccount, useUpdateAccount } from "../core/api";
import { useAccountById } from "../core/hooks"; 
import { useAccountsStore } from "../core/store";
import type { AccountFormData } from "../core/types";
import { useUserStore } from "@/store/useUserStore.";

export function AccountsForm() {
  const { isFormOpen, formMode, formInitialValues, closeForm } = useAccountsStore();
  const { users, loading: usersLoading, fetchUsers } = useUserStore();
  const createAccount = useCreateAccount();
  const updateAccount = useUpdateAccount();

  const editId = formMode === "edit" ? Number(formInitialValues?.id) : null;
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
      return undefined;
    }
    return formInitialValues as AccountFormData;
  };

  const handleSubmit = useCallback(
    async (data: AccountFormData) => {
      if (formMode === "create") {
        await createAccount.mutateAsync({
          address: data.address,
          email: data.email,
          name: data.name || "",
          nationalId: data.nationalId || "",
          note: data.note,
          status: data.status,
          phone: data.phone || "",
          assignedToUserId: Number(data.assignedToUserId),
          level: data.level,
        });
      } else if (formMode === "edit" && formInitialValues?.id) {
        await updateAccount.mutateAsync({
          id: Number(formInitialValues.id),
          payload: {
            data: {
              address: data.address,
              email: data.email,
              name: data.name,
              nationalId: data.nationalId,
              note: data.note,
              phone: data.phone,
              level: data.level,
              status: data.status,
              assignedToUserId: Number(data.assignedToUserId),
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
      key={`${formMode}-${editId || "new"}`}
      config={accountsFormConfig}
      initialValues={getInitialValues()}
      isLoading={
        createAccount.isPending || updateAccount.isPending || usersLoading || (formMode === "edit" && isLoadingAccount)
      }
      isOpen={isFormOpen}
      onClose={closeForm}
      onSubmit={handleSubmit}
    />
  );
}
