import { z } from "zod";

export const ValidationSchemas = {
	email: () => z.string().email("ایمیل معتبر وارد کنید"),

	maxLength: (max: number, fieldName: string) =>
		z.string().max(max, `${fieldName} نباید بیشتر از ${max} کاراکتر باشد`),

	maxNumber: (max: number, fieldName: string) =>
		z.coerce.number().max(max, `${fieldName} نباید بیشتر از ${max} باشد`),

	minLength: (min: number, fieldName: string) =>
		z.string().min(min, `${fieldName} باید حداقل ${min} کاراکتر باشد`),

	minNumber: (min: number, fieldName: string) =>
		z.coerce.number().min(min, `${fieldName} باید حداقل ${min} باشد`),

	mobile: () =>
		z
			.string()
			.regex(/^09[0-9]{9}$/, "موبایل باید 11 رقم و با 09 شروع شود")
			.min(1, "موبایل الزامی است"),

	nationalId: () =>
		z
			.string()
			.regex(/^[0-9]{10}$/, "کد ملی باید 10 رقم باشد")
			.optional()
			.or(z.literal("")),

	number: (fieldName: string) =>
		z.coerce.number().min(0, `${fieldName} باید عدد مثبت باشد`),

	optionalEmail: () =>
		z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),

	optionalString: () => z.string().optional().or(z.literal("")),

	pattern: (regex: RegExp, message: string) => z.string().regex(regex, message),

	positiveNumber: (fieldName: string) =>
		z.coerce.number().positive(`${fieldName} باید عدد مثبت باشد`),
	required: (fieldName: string) => z.string().min(1, `${fieldName} الزامی است`),

	url: () => z.string().url("آدرس URL معتبر وارد کنید").optional().or(z.literal("")),
};
