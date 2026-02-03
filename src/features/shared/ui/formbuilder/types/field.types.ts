import type { z } from "zod";

export type FieldType =
	| "text"
	| "email"
	| "tel"
	| "number"
	| "textarea"
	| "select"
	| "date"
	| "password";

export interface SelectOption {
	label: string;
	value: string;
}

export interface BaseFieldConfig {
	name: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	fullWidth?: boolean;
	defaultValue?: string | number;
	validation?: z.ZodTypeAny;
}

export interface TextFieldConfig extends BaseFieldConfig {
	type: "text" | "email" | "tel" | "password";
}

export interface NumberFieldConfig extends BaseFieldConfig {
	type: "number";
}

export interface TextareaFieldConfig extends BaseFieldConfig {
	type: "textarea";
	rows?: number;
}

export interface SelectFieldConfig extends BaseFieldConfig {
	type: "select";
	options?: SelectOption[];
}

export interface DateFieldConfig extends BaseFieldConfig {
	type: "date";
}

export type FieldConfig =
	| TextFieldConfig
	| NumberFieldConfig
	| TextareaFieldConfig
	| SelectFieldConfig
	| DateFieldConfig;
