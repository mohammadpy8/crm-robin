import type { FieldConfig, SelectOption } from "./field.types";

export interface RowConfig {
	fields: FieldConfig[];
}

export interface SubmitButtonConfig {
	text: string;
	className?: string;
}

export interface FieldDataMap {
	[fieldName: string]: {
		options?: SelectOption[];
	};
}

export interface FormConfig {
	rows: RowConfig[];
	submitButton?: SubmitButtonConfig;
}

export interface FormBuilderProps<T extends Record<string, unknown>> {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: T) => void | Promise<void>;
	config: FormConfig;
	initialValues?: Partial<T>;
	fieldData?: FieldDataMap;
}
