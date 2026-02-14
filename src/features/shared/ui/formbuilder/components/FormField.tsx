"use client";

import { Select, SelectItem } from "@heroui/select";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FieldConfig, SelectFieldConfig, SelectOption, TextareaFieldConfig } from "../types";

interface FieldDataProps {
  options?: SelectOption[];
}

interface FormFieldProps {
  field: FieldConfig;
  register: UseFormRegister<Record<string, unknown>>;
  errors: FieldErrors<Record<string, unknown>>;
  fieldData?: FieldDataProps;
}

const BASE_INPUT_CLASSES =
  "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-right text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all";

export function FormField({ field, register, errors, fieldData }: FormFieldProps) {
  const renderInput = () => {
    switch (field.type) {
      case "textarea": {
        const textareaField = field as TextareaFieldConfig;
        return (
          <textarea
            {...register(field.name)}
            className={`${BASE_INPUT_CLASSES} resize-none`}
            placeholder={field.placeholder ?? field.label}
            rows={textareaField.rows ?? 5}
          />
        );
      }

      case "select": {
        const selectField = field as SelectFieldConfig;
        const options: SelectOption[] = fieldData?.options ?? selectField.options ?? [];
        return (
          <Select
            {...register(field.name)}
            placeholder='انتخاب کنید...'
            classNames={{
              trigger: "bg-gray-50 border-gray-200 rounded-xl text-right data-[hover=true]:bg-gray-100",
              value: "text-right text-sm",
              popoverContent: "rounded-xl",
              listbox: "text-right",
            }}
            dir='rtl'
            aria-label={field.label}
          >
            {options.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
        );
      }

      default:
        return (
          <input
            {...register(field.name)}
            className={BASE_INPUT_CLASSES}
            placeholder={field.placeholder ?? field.label}
            type={field.type}
          />
        );
    }
  };

  const error = errors[field.name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className='space-y-2'>
      <label className='block text-right font-medium text-primary text-sm'>
        {field.label}
        {field.required && <span className='text-red-500'> *</span>}
      </label>
      {renderInput()}
      {errorMessage && <p className='text-right text-red-500 text-xs'>{errorMessage}</p>}
    </div>
  );
}
