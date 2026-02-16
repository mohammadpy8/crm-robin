import type { FormConfig } from "@/features/shared/ui/formbuilder";
import { ValidationSchemas } from "@/features/shared/ui/formbuilder";

export const ContactsFormConfig: FormConfig = {
  rows: [
    {
      fields: [
        {
          label: "نام",
          name: "firstName",
          placeholder: "نام",
          required: true,
          type: "text" as const,
          validation: ValidationSchemas.minLength(2, "نام"),
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
          name: "phone",
          placeholder: "موبایل",
          required: true,
          type: "tel" as const,
          validation: ValidationSchemas.mobile(),
        },
        {
          label: "موقعیت در سازمان",
          name: "position",
          options: [
            { label: "مالک", value: "owner" },
            { label: "مدیر", value: "manager" },
            { label: "حسابدار", value: "accountant" },
            { label: "منشی", value: "secretary" },
            { label: "کارمند", value: "employee" },
            { label: "سایر", value: "other" },
          ],
          placeholder: "انتخاب موقعیت",
          required: false,
          type: "select" as const,
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
          name: "companyId",
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
