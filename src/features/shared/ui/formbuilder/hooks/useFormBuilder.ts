"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import type { FormConfig } from "../types";
import { createZodSchema, getAllFields, getDefaultValues } from "../utils";

export function useFormBuilder<T extends Record<string, unknown>>(
	config: FormConfig,
	isOpen: boolean,
	initialValues?: Partial<T>,
) {
	const allFields = getAllFields(config.rows);
	const schema = createZodSchema(allFields);
	const defaultValues = getDefaultValues(allFields, initialValues);

	const {
		register,
		handleSubmit: rhfHandleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues,
		resolver: zodResolver(schema),
	});

	const hasResetRef = useRef(false);

	useEffect(() => {
		if (isOpen && !hasResetRef.current) {
			reset(getDefaultValues(allFields, initialValues));
			hasResetRef.current = true;
		}

		if (!isOpen) {
			hasResetRef.current = false;
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
