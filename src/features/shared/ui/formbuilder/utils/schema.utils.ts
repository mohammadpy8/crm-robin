import { z } from "zod";
import type { FieldConfig } from "../types";

function getBaseSchema(field: FieldConfig): z.ZodTypeAny {
	if (field.validation) {
		return field.validation;
	}

	switch (field.type) {
		case "email":
			return z.string().email("ایمیل معتبر نیست");
		case "number":
			return z.coerce.number();
		default:
			return z.string();
	}
}

function applyRequiredRule(field: FieldConfig, base: z.ZodTypeAny): z.ZodTypeAny {
	if (!field.required) {
		return base.optional();
	}

	return field.type === "number"
		? (base as z.ZodNumber).min(0, `${field.label} الزامی است`)
		: (base as z.ZodString).min(1, `${field.label} الزامی است`);
}

export function createZodSchema(fields: FieldConfig[]): z.ZodObject<z.ZodRawShape> {
	const schemaFields: Record<string, z.ZodTypeAny> = {};

	for (const field of fields) {
		const base = getBaseSchema(field);
		schemaFields[field.name] = applyRequiredRule(field, base);
	}

	return z.object(schemaFields);
}
