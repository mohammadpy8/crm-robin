"use client";

import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/drawer";
import { Spinner } from "@heroui/spinner";
import type { JSX } from "react";
import { useFormBuilder } from "../hooks";
import type { FormBuilderProps } from "../types";
import { FormRow } from "./FormRow";

const DEFAULT_SUBMIT_BUTTON_CLASSES =
  "w-[70%] transform rounded-xl bg-primary py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-primary/95 hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

export function FormBuilder<T extends Record<string, unknown>>({
  isOpen,
  onClose,
  config,
  initialValues,
  fieldData,
  onSubmit,
  isLoading = false,
}: FormBuilderProps<T>): JSX.Element | null {
  const { register, handleSubmit, errors } = useFormBuilder<T>(config, isOpen, initialValues);

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data as T);
  });

  const submitButtonText = config.submitButton?.text ?? "تایید";
  const submitButtonClasses = config.submitButton?.className ?? DEFAULT_SUBMIT_BUTTON_CLASSES;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement='right'
      size='lg'
      classNames={{
        base: "md:top-24 md:bottom-6",
        backdrop: "bg-[#D9D9D9]/70 md:top-21",
      }}
    >
      <DrawerContent>
        <DrawerBody className='px-8 py-6'>
          <form className='space-y-6' onSubmit={handleFormSubmit}>
            {config.rows.map((row, index) => (
              <FormRow errors={errors} fieldData={fieldData} key={index} register={register} row={row} />
            ))}

            <div className='flex justify-center pt-4'>
              <button className={submitButtonClasses} disabled={isLoading} type='submit'>
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <Spinner color='white' size='sm' />
                    <span>در حال پردازش...</span>
                  </div>
                ) : (
                  submitButtonText
                )}
              </button>
            </div>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
