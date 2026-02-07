import type {
	ContactFormContainerProps,
	ContactFormData,
} from "@/features/dashboard/contacts/types";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { ContactsFormConfig } from "./FormConfig";

export default function ContactsFormContainer({
	isOpen,
	onClose,
	initialValues,
	onSubmit,
}: ContactFormContainerProps) {
	return (
		<FormBuilder<ContactFormData>
			config={ContactsFormConfig}
			initialValues={initialValues}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onSubmit}
		/>
	);
}
