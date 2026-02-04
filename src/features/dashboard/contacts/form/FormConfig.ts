import type { FormConfig } from "@/features/shared/ui/formbuilder";
import { ValidationSchemas } from "@/features/shared/ui/formbuilder";

export const ContactsFormConfig: FormConfig = {
	rows: [
		{
			fields: [
				{
					label: "نام",
					name: "organName",
					placeholder: "نام سازمان",
					required: false,
					type: "text" as const,
				},
				{
					label: "نام خانوادگی",
					name: "lastName",
					placeholder: "نام خانوادگی",
					required: true,
					type: "text" as const,
					validation: ValidationSchemas.minLength(2, "نام خانوادگی"),
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
					label: "سمت کاری (در مجموعه)",
					name: "status",
					placeholder: "سمت کاری",
					required: false,
					type: "text" as const,
				},
			],
		},
		{
			fields: [
				{
					label: "ایمیل",
					name: "email",
					placeholder: "ایمیل",
					required: false,
					type: "email" as const,
					validation: ValidationSchemas.optionalEmail(),
				},
				{
					label: "نام شرکت",
					name: "companyName",
					placeholder: "نام شرکت",
					required: false,
					type: "text" as const,
				},
			],
		},
		{
			fields: [
				{
					fullWidth: true,
					label: "یادداشت",
					name: "note",
					placeholder: "یادداشت...",
					required: false,
					rows: 4,
					type: "textarea" as const,
				},
			],
		},
	],
	submitButton: {
		text: "تایید",
	},
};
