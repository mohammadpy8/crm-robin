import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/api/core/httpClient";
import { authService } from "@/api/services";
import type { UserFormData } from "@/features/dashboard/users/types";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useUsersStore } from "../store";
import { mapUserListToTableRows } from "../utils";


export const useUsersFormHandlers = () => {
	const isOpen = useUsersStore((state) => state.isFormOpen);
	const formMode = useUsersStore((state) => state.formMode);
	const formInitialValues = useUsersStore((state) => state.formInitialValues);
	const { isSidebarOpen, closeSidebar } = useLayoutStore();

	useEffect(() => {
		if (isOpen && isSidebarOpen) {
			closeSidebar();
		}
	}, [isOpen, isSidebarOpen, closeSidebar]);

	const closeForm = useUsersStore((state) => state.closeForm);
	const setTableData = useUsersStore((state) => state.setTableData);
	const setTableLoading = useUsersStore((state) => state.setTableLoading);

	const handleSubmit = useCallback(
		async (data: UserFormData): Promise<void> => {
			try {
				if (formMode === "create") {
					const newUserPayload = {
						email: data.email || "",
						fullName: data.fullName || "",
						password: data.password || "",
						phoneNumber: data.mobile || "",
					};

					await authService.signup(newUserPayload);

					setTableLoading(true);
					const updatedUserList = await authService.getUserList();
					const mappedData = mapUserListToTableRows(updatedUserList);
					setTableData(mappedData);
					setTableLoading(false);
				} else if (formMode === "edit") {
					const updatePayload = {
						email: data.email,
						fullName: data.fullName,
						phoneNumber: data.mobile,
					};

					await authService.updateUser(Number(data.id), updatePayload);

					if (data.role) {
						await authService.updateRole(Number(data.id), {
							roleId: Number(data.role),
						});
					}

					if (data.password) {
						await authService.updatePassword(Number(data.id), {
							password: data.password,
						});
					}
					setTableLoading(true);
					const updatedUserList = await authService.getUserList();
					const mappedData = mapUserListToTableRows(updatedUserList);
					setTableData(mappedData);
					setTableLoading(false);
				}

				closeForm();
			} catch (error) {
				toast(getErrorMessage(error));
			}
		},
		[formMode, setTableData, closeForm],
	);

	const handleClose = useCallback((): void => {
		closeForm();
	}, [closeForm]);

	return {
		handlers: {
			onClose: handleClose,
			onSubmit: handleSubmit,
		},
		state: {
			initialValues: formInitialValues as UserFormData | undefined,
			isOpen,
			mode: formMode,
		},
	};
};
