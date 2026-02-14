"use client";

import { useCallback, useEffect } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useLayoutStore } from "@/store/useLayoutStore";
import { leadsFormConfig } from "../configs/form.config";
import { useCreateLead, useUpdateLead } from "../core/api";
import { useLeadsStore } from "../core/store";
import type { LeadFormData } from "../core/types";

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
					address: data.address,
					company: data.company,
					email: data.email,
					firstName: data.firstName || "",
					lastName: data.lastName || "",
					note: data.note,
					phone: data.phone,
					priority: data.priority,
					source: data.source as any,
					status: data.status as any,
				});
				closeForm();
			} else if (formMode === "edit") {
				if (!formInitialValues) return;

				await updateLead.mutateAsync({
					id: Number(formInitialValues.id),
					payload: {
						address: data.address,
						company: data.company,
						email: data.email,
						firstName: data.firstName,
						lastName: data.lastName,
						note: data.note,
						phone: data.phone,
						priority: data.priority,
						source: data.source,
						status: data.status,
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
		formMode,
		initialValues: formInitialValues as LeadFormData | undefined,
		isOpen,
		isPending: createLead.isPending || updateLead.isPending,
		onClose: handleClose,
		onSubmit: handleSubmit,
	};
};

export function LeadsForm() {
	const formState = useLeadsForm();

	return (
		<FormBuilder<LeadFormData>
			config={leadsFormConfig}
			initialValues={formState.initialValues}
			isLoading={formState.isPending}
			isOpen={formState.isOpen}
			key={`${formState.formMode}-${formState.initialValues?.id || "new"}`}
			onClose={formState.onClose}
			onSubmit={formState.onSubmit}
		/>
	);
}
