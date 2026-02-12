"use client";

import type { UserFormData } from "@/features/dashboard/users/types";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useRoleStore } from "@/store/useRoleStore";
import { getUsersFormConfig } from "./config";
import { useUsersFormHandlers } from "./handlers";

export default function UsersFormContainer() {
	const { roles } = useRoleStore();
	const { state, handlers } = useUsersFormHandlers();

	const config = getUsersFormConfig(roles);

	return (
		<FormBuilder<UserFormData>
			config={config}
			initialValues={state.initialValues}
			isOpen={state.isOpen}
			onClose={handlers.onClose}
			onSubmit={handlers.onSubmit}
		/>
	);
}
