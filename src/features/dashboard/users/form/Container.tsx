import type {
	UserFormContainerProps,
	UserFormData,
} from "@/features/dashboard/users/types";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { UsersFormConfig } from "./Config";

export default function UsersFormContainer({
	isOpen,
	onClose,
	initialValues,
	onSubmit,
}: UserFormContainerProps) {
	return (
		<FormBuilder<UserFormData>
			config={UsersFormConfig}
			initialValues={initialValues}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onSubmit}
		/>
	);
}
