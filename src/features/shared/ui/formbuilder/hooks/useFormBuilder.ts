"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import type { FormConfig } from "../types";
import { createZodSchema, getAllFields, getDefaultValues } from "../utils";

export function useFormBuilder<T extends Record<string, unknown>>(
  config: FormConfig,
  isOpen: boolean,
  initialValues?: Partial<T>,
) {
  const allFields = useMemo(() => getAllFields(config.rows), [config.rows]);
  const schema = useMemo(() => createZodSchema(allFields), [allFields]);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const prevInitialValuesJsonRef = useRef<string>("");
  const isFirstOpenRef = useRef(true);

  useEffect(() => {
    const currentJson = JSON.stringify(initialValues || {});

    if (isOpen) {
      if (isFirstOpenRef.current || currentJson !== prevInitialValuesJsonRef.current) {
        const newValues = getDefaultValues(allFields, initialValues);
        reset(newValues);
        prevInitialValuesJsonRef.current = currentJson;
        isFirstOpenRef.current = false;
      }
    } else {
      isFirstOpenRef.current = true;
    }
  }, [isOpen, initialValues, allFields, reset]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return {
    errors,
    handleSubmit: rhfHandleSubmit,
    register,
    reset,
  };
}
