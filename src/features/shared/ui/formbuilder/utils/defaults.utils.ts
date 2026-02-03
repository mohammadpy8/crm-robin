import type { FieldConfig, RowConfig } from "../types";

export function getAllFields(rows: RowConfig[]): FieldConfig[] {
	return rows.flatMap((row) => row.fields);
}

export function getDefaultValues<T extends Record<string, unknown>>(
	fields: FieldConfig[],
	initialValues?: Partial<T>,
): Record<string, string | number> {
	const defaults: Record<string, string | number> = {};

	for (const field of fields) {
		if (initialValues && field.name in initialValues) {
			const value = initialValues[field.name];
			defaults[field.name] = value as string | number;
		} else if (field.defaultValue !== undefined) {
			defaults[field.name] = field.defaultValue;
		} else {
			defaults[field.name] = field.type === "number" ? 0 : "";
		}
	}

	return defaults;
}
