// features/dashboard/users/form/handlers.ts

import { useCallback, useEffect } from "react";
import type { UserFormData } from "@/features/dashboard/users/types";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useUsersStore } from "../store";

export const useUsersFormHandlers = () => {
	// Get state from store
	const isOpen = useUsersStore((state) => state.isFormOpen);
	const formMode = useUsersStore((state) => state.formMode);
	const formInitialValues = useUsersStore((state) => state.formInitialValues);
	const { isSidebarOpen, closeSidebar } = useLayoutStore();

	useEffect(() => {
		if (isOpen && isSidebarOpen) {
			closeSidebar();
		}
	}, [isOpen, isSidebarOpen, closeSidebar]);

	// Get actions from store
	const closeForm = useUsersStore((state) => state.closeForm);
	const setTableData = useUsersStore((state) => state.setTableData);
	const tableData = useUsersStore((state) => state.tableData);

	// Handlers
	const handleSubmit = useCallback(
		async (data: UserFormData): Promise<void> => {
			console.log("📨 Submit Form:", { data, formMode });

			try {
				if (formMode === "create") {
					console.log("✅ Creating user:", data);
					await new Promise((resolve) => setTimeout(resolve, 500));

					const newUser = {
						createdAt: new Date().toLocaleDateString("fa-IR"),
						email: data.email || "",
						fullName: data.fullName || "",
						id: Date.now(),
						role: data.role || "",
					};

					setTableData([newUser, ...tableData]);
				} else if (formMode === "edit") {
					console.log("✅ Updating user:", data);
					await new Promise((resolve) => setTimeout(resolve, 500));

					const updatedData = tableData.map((user) =>
						user.id.toString() === data.id
							? {
									...user,
									email: data.email || user.email,
									fullName: data.fullName || user.fullName,
									role: data.role || user.role,
								}
							: user,
					);

					setTableData(updatedData);
				}

				closeForm();
			} catch (error) {
				console.error("❌ Error submitting form:", error);
			}
		},
		[formMode, tableData, setTableData, closeForm],
	);

	const handleClose = useCallback((): void => {
		console.log("❌ Form closed");
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
