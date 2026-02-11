"use client";

import type { UserFormData } from "@/features/dashboard/users/types";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useRoleStore } from "@/store/useRoleStore";
import { getUsersFormConfig } from "./config";
import { useUsersFormHandlers } from "./handlers";

export default function UsersFormContainer() {
	const { roles } = useRoleStore();
	const { isOpen, initialValues, handleSubmit, handleClose } = useUsersFormHandlers();

	const config = getUsersFormConfig(roles);

	return (
		<FormBuilder<UserFormData>
			config={config}
			initialValues={initialValues}
			isOpen={isOpen}
			onClose={handleClose}
			onSubmit={handleSubmit}
		/>
	);
}
