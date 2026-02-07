import type {
	AccountFormContainerProps,
	AccountFormData,
} from "@/features/dashboard/accounts/types";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { AccountsFormConfig } from "./FormConfig";

export default function AccountsFormContainer({
	isOpen,
	onClose,
	initialValues,
	onSubmit,
}: AccountFormContainerProps) {
	return (
		<FormBuilder<AccountFormData>
			config={AccountsFormConfig}
			initialValues={initialValues}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onSubmit}
		/>
	);
}
