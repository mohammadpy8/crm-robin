import type { FormConfig } from "@/features/shared/ui/formbuilder";
import { ValidationSchemas } from "@/features/shared/ui/formbuilder";

export const UsersFormConfig: FormConfig = {
	rows: [
		{
			fields: [
				{
					label: "نام کامل",
					name: "fullName",
					placeholder: "نام کامل",
					required: true,
					type: "text" as const,
					validation: ValidationSchemas.minLength(2, "نام کامل"),
				},
				{
					label: "نقش کاربری",
					name: "role",
					placeholder: "نقش کاربری",
					required: false,
					type: "text" as const,
				},
			],
		},
		{
			fields: [
				{
					label: "موبایل",
					name: "mobile",
					placeholder: "موبایل",
					required: true,
					type: "tel" as const,
					validation: ValidationSchemas.mobile(),
				},
				{
					label: "رمز ورود",
					name: "password",
					placeholder: "رمز ورود",
					required: true,
					type: "password" as const,
					validation: ValidationSchemas.minLength(8, "رمز ورود"),
				},
			],
		},
		{
			fields: [
				{
					fullWidth: true,
					label: "ایمیل",
					name: "email",
					placeholder: "پیش فرض",
					required: true,
					type: "email" as const,
					validation: ValidationSchemas.email(),
				},
			],
		},
	],
	submitButton: {
		text: "تایید",
	},
};
