import type { FormConfig } from "@/features/shared/ui/formbuilder";
import { ValidationSchemas } from "@/features/shared/ui/formbuilder";

export const AccountsFormConfig: FormConfig = {
	rows: [
		{
			fields: [
				{
					label: "نام سازمان",
					name: "organName",
					placeholder: "نام سازمان",
					required: true,
					type: "text" as const,
					validation: ValidationSchemas.minLength(2, "نام سازمان"),
				},
				{
					label: "ایمیل",
					name: "email",
					placeholder: "ایمیل",
					required: false,
					type: "email" as const,
					validation: ValidationSchemas.optionalEmail(),
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
					label: "وضعیت",
					name: "status",
					placeholder: "پیش فرض",
					required: false,
					type: "text" as const,
				},
			],
		},
		{
			fields: [
				{
					label: "سطح مجموعه",
					name: "serviceLevel",
					placeholder: "پیش فرض",
					required: false,
					type: "text" as const,
				},
				{
					label: "شناسه ملی",
					name: "nationalId",
					placeholder: "شناسه ملی",
					required: false,
					type: "text" as const,
				},
			],
		},
		{
			fields: [
				{
					label: "ارجاع به",
					name: "referredBy",
					placeholder: "ارجاع به",
					required: false,
					type: "text" as const,
				},
				{
					label: "آدرس",
					name: "address",
					placeholder: "آدرس",
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
