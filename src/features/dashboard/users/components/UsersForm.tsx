"use client";

import { useCallback, useEffect } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useRoleStore } from "@/store/useRoleStore";
import { getUsersFormConfig } from "../configs/form.config";
import { useCreateUser, useUpdateUser } from "../core/api";
import { useUsersStore } from "../core/store";
import type { UserFormData } from "../core/types";

const useUsersForm = () => {
	const isOpen = useUsersStore((state) => state.isFormOpen);
	const formMode = useUsersStore((state) => state.formMode);
	const formInitialValues = useUsersStore((state) => state.formInitialValues);
	const closeForm = useUsersStore((state) => state.closeForm);

	const { isSidebarOpen, closeSidebar } = useLayoutStore();

	const createUser = useCreateUser();
	const updateUser = useUpdateUser();

	useEffect(() => {
		if (isOpen && isSidebarOpen) {
			closeSidebar();
		}
	}, [isOpen, isSidebarOpen, closeSidebar]);

	const handleSubmit = useCallback(
		async (data: UserFormData): Promise<void> => {
			if (formMode === "create") {
				await createUser.mutateAsync({
					email: data.email || "",
					fullName: data.fullName || "",
					password: data.password || "",
					phoneNumber: data.mobile || "",
				});
				closeForm();
			} else if (formMode === "edit") {
				if (!formInitialValues) return;
				

				await updateUser.mutateAsync({
					id: Number(formInitialValues.id),
					payload: {
						data: {
							email: data.email,
							fullName: data.fullName,
							phoneNumber: data.mobile,
						},
						password: data.password || undefined,
						roleId: data.role ? Number(data.role) : undefined,
					},
				});
				closeForm();
			}
		},
		[formMode, createUser, updateUser, closeForm, formInitialValues],
	);

	const handleClose = useCallback((): void => {
		closeForm();
	}, [closeForm]);

	return {
		formMode,
		initialValues: formInitialValues as UserFormData | undefined,
		isOpen,
		isPending: createUser.isPending || updateUser.isPending,
		onClose: handleClose,
		onSubmit: handleSubmit,
	};
};

export function UsersForm() {
	const { roles } = useRoleStore();
	const formState = useUsersForm();

	const config = getUsersFormConfig(roles);

	return (
		<FormBuilder<UserFormData>
			config={config}
			initialValues={formState.initialValues}
			isLoading={formState.isPending}
			isOpen={formState.isOpen}
			key={`${formState.formMode}-${formState.initialValues?.id || "new"}`}
			onClose={formState.onClose}
			onSubmit={formState.onSubmit}
		/>
	);
}
