"use client";

import { useCallback, useEffect } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useRoleStore } from "@/store/useRoleStore";
import { getUsersFormConfig } from "../configs/form.config";
import { useCreateUser, useUpdateUser } from "../core/api";
import { useUsersStore } from "../core/store";
import type { UserFormData } from "../core/types";
import { toFormData, useUserById } from "../core/utils";

export function UsersForm() {
	const { isFormOpen, formMode, formInitialValues, closeForm } = useUsersStore();
	const { roles } = useRoleStore();
	const { isSidebarOpen, closeSidebar } = useLayoutStore();

	const createUser = useCreateUser();
	const updateUser = useUpdateUser();

	const editId =
		formMode === "edit" && formInitialValues?.id
			? Number(formInitialValues.id)
			: undefined;
	const { data: userData, isLoading: isLoadingUser } = useUserById(editId);

	useEffect(() => {
		if (isFormOpen && isSidebarOpen) {
			closeSidebar();
		}
	}, [isFormOpen, isSidebarOpen, closeSidebar]);

	const getInitialValues = (): UserFormData | undefined => {
		if (formMode === "edit" && userData) {
			return toFormData(userData);
		}
		if (formMode === "create") {
			return;
		}
		return formInitialValues as UserFormData;
	};

	const handleSubmit = useCallback(
		async (data: UserFormData) => {
			if (formMode === "create") {
				await createUser.mutateAsync({
					email: data.email || "",
					fullName: data.fullName || "",
					password: data.password || "",
					phoneNumber: data.mobile || "",
				});
			} else if (formMode === "edit" && editId) {
				await updateUser.mutateAsync({
					id: editId,
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
			}
			closeForm();
		},
		[formMode, editId, createUser, updateUser, closeForm],
	);

	return (
		<FormBuilder<UserFormData>
			config={getUsersFormConfig(roles)}
			initialValues={getInitialValues()}
			isLoading={
				createUser.isPending ||
				updateUser.isPending ||
				(formMode === "edit" && isLoadingUser)
			}
			isOpen={isFormOpen}
			key={`${formMode}-${editId || "new"}`}
			onClose={closeForm}
			onSubmit={handleSubmit}
		/>
	);
}
