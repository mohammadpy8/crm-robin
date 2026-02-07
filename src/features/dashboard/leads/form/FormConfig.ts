import type { FormConfig } from "@/features/shared/ui/formbuilder";
import { ValidationSchemas } from "@/features/shared/ui/formbuilder";

export const LeadsFormConfig: FormConfig = {
	rows: [
		{
			fields: [
				{
					label: "نام",
					name: "firstName",
					placeholder: "نام",
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
					required: false,
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
					label: "منبع سر نخ",
					name: "leadSource",
					placeholder: "پیش فرض",
					required: false,
					type: "text" as const,
				},
				{
					label: "اولویت",
					name: "priority",
					placeholder: "اولویت",
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
					label: "نام شرکت",
					name: "companyName",
					placeholder: "نام شرکت",
					required: false,
					type: "text" as const,
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
