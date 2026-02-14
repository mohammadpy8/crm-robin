
import type { FormConfig } from "@/features/shared/ui/formbuilder";
import { ValidationSchemas } from "@/features/shared/ui/formbuilder";


export const leadsFormConfig: FormConfig = {
  rows: [
    {
      fields: [
        {
          label: "نام",
          name: "firstName",
          type: "text" as const,
          placeholder: "نام را وارد کنید",
          required: false,
        },
        {
          label: "نام خانوادگی",
          name: "lastName",
          type: "text" as const,
          placeholder: "نام خانوادگی را وارد کنید",
          required: true,
          validation: ValidationSchemas.minLength(2, "نام خانوادگی"),
        },
      ],
    },

    {
      fields: [
        {
          label: "تلفن همراه",
          name: "phone",
          type: "tel" as const,
          placeholder: "09xxxxxxxxx",
          required: false,
          validation: ValidationSchemas.mobile(),
        },
        {
          label: "ایمیل",
          name: "email",
          type: "email" as const,
          placeholder: "example@domain.com",
          required: false,
          validation: ValidationSchemas.optionalEmail(),
        },
      ],
    },

    // ────────────────────────────────────────
    // ردیف 3: وضعیت و منبع سرنخ
    // ────────────────────────────────────────
    {
      fields: [
        {
          label: "وضعیت",
          name: "status",
          type: "select" as const,
          placeholder: "انتخاب وضعیت",
          required: false,
          options: [
            { label: "جدید", value: "new" },
            { label: "تماس گرفته شده", value: "contacted" },
            { label: "واجد شرایط", value: "qualified" },
            { label: "تبدیل شده", value: "converted" },
            { label: "از دست رفته", value: "lost" },
            { label: "موفق", value: "won" },
          ],
        },
        {
          label: "منبع سرنخ",
          name: "source",
          type: "select" as const,
          placeholder: "انتخاب منبع",
          required: false,
          options: [
            { label: "تلفن", value: "telephone" },
            { label: "تلگرام", value: "telegram" },
            { label: "ایمیل", value: "email" },
            { label: "اینستاگرام", value: "instagram" },
            { label: "نمایشگاه", value: "exhibition" },
            { label: "سایر", value: "etc" },
          ],
        },
      ],
    },

    // ────────────────────────────────────────
    // ردیف 4: اولویت و نام شرکت
    // ────────────────────────────────────────
    {
      fields: [
        {
          label: "اولویت",
          name: "priority",
          type: "select" as const,
          placeholder: "انتخاب اولویت",
          required: false,
          options: [
            { label: "کم", value: "low" },
            { label: "متوسط", value: "medium" },
            { label: "بالا", value: "high" },
            { label: "فوری", value: "urgent" },
          ],
        },
        {
          label: "نام شرکت",
          name: "company",
          type: "text" as const,
          placeholder: "نام شرکت را وارد کنید",
          required: false,
        },
      ],
    },

    // ────────────────────────────────────────
    // ردیف 5: آدرس
    // ────────────────────────────────────────
    {
      fields: [
        {
          label: "آدرس",
          name: "address",
          type: "text" as const,
          placeholder: "آدرس کامل را وارد کنید",
          required: false,
          fullWidth: true,
        },
      ],
    },

    // ────────────────────────────────────────
    // ردیف 6: یادداشت
    // ────────────────────────────────────────
    {
      fields: [
        {
          label: "یادداشت",
          name: "note",
          type: "textarea" as const,
          placeholder: "یادداشت خود را وارد کنید...",
          required: false,
          rows: 4,
          fullWidth: true,
        },
      ],
    },
  ],

  submitButton: {
    text: "ذخیره سرنخ",
  },
};
