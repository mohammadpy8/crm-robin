// features/dashboard/users/form/handlers.ts
import { useCallback, useState } from "react";
import type { UserFormData } from "@/features/dashboard/users/types";

export const useUsersFormHandlers = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [initialValues, setInitialValues] = useState<UserFormData | undefined>(undefined);

	const openCreate = useCallback(() => {
		console.log("🟢 open create form");
		setIsOpen(true);
		setInitialValues(undefined);
	}, []);

	const openEdit = useCallback((data: UserFormData) => {
		console.log("🟡 open edit form", data);
		setIsOpen(true);
		setInitialValues(data);
	}, []);

	const handleSubmit = useCallback((data: UserFormData) => {
		console.log("📨 submit form", data);
		console.log("✅ pretend user saved");
		setIsOpen(false);
		setInitialValues(undefined);
	}, []);

	const handleClose = useCallback(() => {
		console.log("❌ form closed by user");
		setIsOpen(false);
		setInitialValues(undefined);
	}, []);

	return {
		handleClose,
		handleSubmit,
		initialValues,
		isOpen,
		openCreate,
		openEdit,
	};
};
