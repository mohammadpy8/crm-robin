"use client";

import { useCallback } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useCreateContact, useUpdateContact } from "../core/api";
import { useContactsStore } from "../core/store";
import type { ContactFormData } from "../core/types";
import { toCreatePayload, toFormData, toUpdatePayload, useContactById } from "../core/utils";
import { ContactsFormConfig } from "../configs/from.config";

export function ContactsForm() {
  const { isFormOpen, formMode, formInitialValues, closeForm } = useContactsStore();
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  const editId = formMode === "edit" && formInitialValues?.id ? Number(formInitialValues.id) : undefined;
  const { data: contactData, isLoading: isLoadingContact } = useContactById(editId);

  const getInitialValues = (): ContactFormData | undefined => {
    if (formMode === "edit" && contactData) {
      return toFormData(contactData);
    }
    if (formMode === "create") {
      return undefined;
    }
    return formInitialValues as ContactFormData;
  };

  const handleSubmit = useCallback(
    async (data: ContactFormData) => {
      if (formMode === "create") {
        await createContact.mutateAsync(toCreatePayload(data));
      } else if (formMode === "edit" && editId) {
        await updateContact.mutateAsync({
          id: editId,
          payload: toUpdatePayload(data),
        });
      }
      closeForm();
    },
    [formMode, editId, createContact, updateContact, closeForm],
  );

  return (
    <FormBuilder<ContactFormData>
      config={ContactsFormConfig}
      initialValues={getInitialValues()}
      isLoading={createContact.isPending || updateContact.isPending || (formMode === "edit" && isLoadingContact)}
      isOpen={isFormOpen}
      key={`${formMode}-${editId || "new"}`}
      onClose={closeForm}
      onSubmit={handleSubmit}
    />
  );
}
