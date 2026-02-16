"use client";

import { useCallback } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { leadsFormConfig } from "../configs/form.config";
import { useCreateLead, useUpdateLead } from "../core/api";
import { useLeadsStore } from "../core/store";
import type { LeadFormData } from "../core/types";
import { toCreatePayload, toFormData, toUpdatePayload, useLeadById } from "../core/utils";

export function LeadsForm() {
	const { isFormOpen, formMode, formInitialValues, closeForm } = useLeadsStore();
	const createLead = useCreateLead();
	const updateLead = useUpdateLead();
	const editId =
		formMode === "edit" && formInitialValues?.id
			? Number(formInitialValues.id)
			: undefined;
	const { data: leadData, isLoading: isLoadingLead } = useLeadById(editId);

	const getInitialValues = (): LeadFormData | undefined => {
		if (formMode === "edit" && leadData) {
			return toFormData(leadData);
		}
		if (formMode === "create") {
			return;
		}
		return formInitialValues as LeadFormData;
	};

	const handleSubmit = useCallback(
		async (data: LeadFormData) => {
			if (formMode === "create") {
				await createLead.mutateAsync(toCreatePayload(data));
			} else if (formMode === "edit" && editId) {
				await updateLead.mutateAsync({
					id: editId,
					payload: toUpdatePayload(data),
				});
			}
			closeForm();
		},
		[formMode, editId, createLead, updateLead, closeForm],
	);

	return (
		<FormBuilder<LeadFormData>
			config={leadsFormConfig}
			initialValues={getInitialValues()}
			isLoading={
				createLead.isPending ||
				updateLead.isPending ||
				(formMode === "edit" && isLoadingLead)
			}
			isOpen={isFormOpen}
			key={`${formMode}-${editId || "new"}`}
			onClose={closeForm}
			onSubmit={handleSubmit}
		/>
	);
}
