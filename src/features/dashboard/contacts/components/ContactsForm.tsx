"use client";

import { useCallback } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useContactsStore } from "../core/store";
import { useCreateContact, useUpdateContact } from "../core/api";
import type { ContactFormData } from "../core/types";
import { ContactsFormConfig } from "../configs/from.config";

export function ContactsForm() {
  const { isFormOpen, formMode, formInitialValues, closeForm } = useContactsStore();
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();

  const handleSubmit = useCallback(
    async (data: ContactFormData) => {
      if (formMode === "create") {
        await createContact.mutateAsync({
          firstName: data.organName,
          lastName: data.lastName || "",
          phone: data.mobile || "",
          email: data.email,
          note: data.note,
        });
      } else if (formMode === "edit" && formInitialValues?.id) {
        await updateContact.mutateAsync({
          id: Number(formInitialValues.id),
          payload: {
            data: {
              firstName: data.organName,
              lastName: data.lastName,
              phone: data.mobile,
              email: data.email,
              note: data.note,
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
      isOpen={isFormOpen}
      onClose={closeForm}
      onSubmit={handleSubmit}
      initialValues={formInitialValues as ContactFormData}
      isLoading={createContact.isPending || updateContact.isPending}
      config={ContactsFormConfig}
    />
  );
}
