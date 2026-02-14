"use client";

import { useCallback } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useAccountsStore } from "../core/store";
import { useCreateAccount, useUpdateAccount } from "../core/api";
import type { AccountFormData } from "../core/types";
import { AccountsFormConfig } from "../configs/form.config";

export function AccountsForm() {
  const { isFormOpen, formMode, formInitialValues, closeForm } = useAccountsStore();
  const createAccount = useCreateAccount();
  const updateAccount = useUpdateAccount();

  const handleSubmit = useCallback(
    async (data: AccountFormData) => {
      if (formMode === "create") {
        await createAccount.mutateAsync({
          name: data.organName || "",
          phone: data.mobile || "",
          nationalId: data.nationalId || "",
          email: data.email,
          address: data.address,
          note: data.note,
        });
      } else if (formMode === "edit" && formInitialValues?.id) {
        await updateAccount.mutateAsync({
          id: Number(formInitialValues.id),
          payload: {
            data: {
              name: data.organName,
              phone: data.mobile,
              nationalId: data.nationalId,
              email: data.email,
              address: data.address,
              note: data.note,
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
      isOpen={isFormOpen}
      onClose={closeForm}
      onSubmit={handleSubmit}
      initialValues={formInitialValues as AccountFormData}
      isLoading={createAccount.isPending || updateAccount.isPending}
      config={AccountsFormConfig}
    />
  );
}
