//leads form// src/features/dashboard/leads/components/LeadsForm.tsx
"use client";

import { useCallback, useEffect } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useLayoutStore } from "@/store/useLayoutStore";
import type { LeadFormData } from "../core/types";
import { useLeadsStore } from "../core/store";
import { useCreateLead, useUpdateLead } from "../core/api";
import { leadsFormConfig } from "../configs/form.config";

const useLeadsForm = () => {
  const isOpen = useLeadsStore((state) => state.isFormOpen);
  const formMode = useLeadsStore((state) => state.formMode);
  const formInitialValues = useLeadsStore((state) => state.formInitialValues);
  const closeForm = useLeadsStore((state) => state.closeForm);

  const { isSidebarOpen, closeSidebar } = useLayoutStore();

  const createLead = useCreateLead();
  const updateLead = useUpdateLead();

  useEffect(() => {
    if (isOpen && isSidebarOpen) {
      closeSidebar();
    }
  }, [isOpen, isSidebarOpen, closeSidebar]);

  const handleSubmit = useCallback(
    async (data: LeadFormData): Promise<void> => {
      if (formMode === "create") {
        await createLead.mutateAsync({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone,
          email: data.email,
          status: data.status as any,
          source: data.source as any,
          priority: data.priority,
          company: data.company,
          address: data.address,
          note: data.note,
        });
        closeForm();
      } else if (formMode === "edit") {
        if (!formInitialValues) return;

        await updateLead.mutateAsync({
          id: Number(formInitialValues.id),
          payload: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            status: data.status,
            source: data.source,
            priority: data.priority,
            company: data.company,
            address: data.address,
            note: data.note,
          },
        });
        closeForm();
      }
    },
    [formMode, createLead, updateLead, closeForm, formInitialValues],
  );

  const handleClose = useCallback((): void => {
    closeForm();
  }, [closeForm]);

  return {
    isOpen,
    initialValues: formInitialValues as LeadFormData | undefined,
    isPending: createLead.isPending || updateLead.isPending,
    onSubmit: handleSubmit,
    onClose: handleClose,
    formMode,
  };
};

export function LeadsForm() {
  const formState = useLeadsForm();

  return (
    <FormBuilder<LeadFormData>
      key={`${formState.formMode}-${formState.initialValues?.id || "new"}`}
      config={leadsFormConfig}
      initialValues={formState.initialValues}
      isLoading={formState.isPending}
      isOpen={formState.isOpen}
      onClose={formState.onClose}
      onSubmit={formState.onSubmit}
    />
  );
}
