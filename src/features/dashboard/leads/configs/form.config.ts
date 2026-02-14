import type { FormConfig } from "@/features/shared/ui/formbuilder";
import { ValidationSchemas } from "@/features/shared/ui/formbuilder";

export const leadsFormConfig: FormConfig = {
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
					validation: ValidationSchemas.minLength(7, "نام خانوادگی"),
				},
			],
		},

		{
			fields: [
				{
					label: "موبایل",
					name: "phone",
					placeholder: "موبایل",
					required: false,
					type: "tel" as const,
					validation: ValidationSchemas.mobile(),
				},
				{
					label: "ایمیل",
					name: "email",
					placeholder: "example@domain.com",
					required: false,
					type: "email" as const,
					validation: ValidationSchemas.optionalEmail(),
				},
			],
		},

		{
			fields: [
				{
					label: "وضعیت",
					name: "status",
					options: [
						{ label: "جدید", value: "new" },
						{ label: "تماس گرفته شده", value: "contacted" },
						{ label: "واجد شرایط", value: "qualified" },
						{ label: "تبدیل شده", value: "converted" },
						{ label: "از دست رفته", value: "lost" },
						{ label: "موفق", value: "won" },
					],
					placeholder: "پیش فرض",
					required: false,
					type: "select" as const,
				},
				{
					label: "منبع سرنخ",
					name: "source",
					options: [
						{ label: "تلفن", value: "telephone" },
						{ label: "تلگرام", value: "telegram" },
						{ label: "ایمیل", value: "email" },
						{ label: "اینستاگرام", value: "instagram" },
						{ label: "نمایشگاه", value: "exhibition" },
						{ label: "سایر", value: "etc" },
					],
					placeholder: "پیش فرض",
					required: false,
					type: "select" as const,
				},
			],
		},

		{
			fields: [
				{
					label: "اولویت",
					name: "priority",
					options: [
						{ label: "کم", value: "low" },
						{ label: "متوسط", value: "medium" },
						{ label: "بالا", value: "high" },
						{ label: "فوری", value: "urgent" },
					],
					placeholder: "انتخاب اولویت",
					required: false,
					type: "select" as const,
				},
				{
					label: "نام شرکت",
					name: "company",
					placeholder: "نام شرکت را وارد کنید",
					required: false,
					type: "text" as const,
				},
			],
		},

		{
			fields: [
				{
					fullWidth: true,
					label: "آدرس",
					name: "address",
					placeholder: "آدرس کامل را وارد کنید",
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
					placeholder: "یادداشت خود را وارد کنید...",
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
