import { useCallback, useEffect } from "react";
import type { UserFormData } from "@/features/dashboard/users/types";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useCreateUser, useUpdateUser } from "../api";
import { useUsersStore } from "../store";

export const useUsersFormHandlers = () => {
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
			try {
				if (formMode === "create") {
					await createUser.mutateAsync({
						email: data.email || "",
						fullName: data.fullName || "",
						password: data.password || "",
						phoneNumber: data.mobile || "",
					});
				} else if (formMode === "edit") {
					if (!formInitialValues) {
						return;
					}
					await updateUser.mutateAsync({
						data: {
							email: data.email,
							fullName: data.fullName,
							phoneNumber: data.mobile,
						},
						id: Number(formInitialValues.id),
						password: data.password || undefined,
						roleId: data.role ? Number(data.role) : undefined,
					});
				}

				closeForm();
			} catch (error) {
				console.error("Form submission error:", error);
			}
		},
		[formMode, createUser, updateUser, closeForm],
	);

	const handleClose = useCallback((): void => {
		closeForm();
	}, [closeForm]);

	const isPending = createUser.isPending || updateUser.isPending;

	return {
		handlers: {
			onClose: handleClose,
			onSubmit: handleSubmit,
		},
		state: {
			initialValues: formInitialValues as UserFormData | undefined,
			isOpen,
			isPending,
			mode: formMode,
		},
	};
};
