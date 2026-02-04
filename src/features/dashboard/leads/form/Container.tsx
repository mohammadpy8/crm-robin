import type {
	LeadFormContainerProps,
	LeadFormData,
} from "@/features/dashboard/leads/types";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { LeadsFormConfig } from "./FormConfig";

export default function LeadsFormContainer({
	isOpen,
	onClose,
	initialValues,
	onSubmit,
}: LeadFormContainerProps) {
	return (
		<FormBuilder<LeadFormData>
			config={LeadsFormConfig}
			initialValues={initialValues}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onSubmit}
		/>
	);
}
