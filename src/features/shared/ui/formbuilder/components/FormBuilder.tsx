"use client";

import { ScrollShadow } from "@heroui/scroll-shadow";
import type { JSX } from "react";
import { useFormBuilder } from "../hooks";
import type { FormBuilderProps } from "../types";
import { FormRow } from "./FormRow";

const BACKDROP_CLASSES =
	"fixed inset-0 top-20 z-40 bg-[#D9D9D9]/70 transition-opacity duration-300";

const SIDEBAR_CLASSES =
	"fixed top-24 right-0 bottom-6 z-50 w-full max-w-lg overflow-hidden rounded-l-3xl bg-white shadow-2xl transition-transform duration-300 ease-out";

const DEFAULT_SUBMIT_BUTTON_CLASSES =
	"w-[70%] transform rounded-xl bg-primary py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-primary/95 hover:shadow-xl active:scale-[0.98]";

export function FormBuilder<T extends Record<string, unknown>>({
	isOpen,
	onClose,
	config,
	initialValues,
	fieldData,
	onSubmit,
}: FormBuilderProps<T>): JSX.Element | null {
	const { register, handleSubmit, errors } = useFormBuilder<T>(
		config,
		isOpen,
		initialValues,
	);

	if (!isOpen) {
		return null;
	}

	const handleFormSubmit = handleSubmit((data) => {
		onSubmit(data as T);
	});

	const submitButtonText = config.submitButton?.text ?? "تایید";
	const submitButtonClasses =
		config.submitButton?.className ?? DEFAULT_SUBMIT_BUTTON_CLASSES;

	return (
		<>
			<button
				aria-label="Close form"
				className={`${BACKDROP_CLASSES} ${
					isOpen ? "opacity-100" : "pointer-events-none opacity-0"
				}`}
				onClick={onClose}
				onKeyDown={(e) => {
					if (e.key === "Escape") {
						onClose();
					}
				}}
				type="button"
			/>

			<div
				className={`${SIDEBAR_CLASSES} ${isOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<ScrollShadow className="h-full" hideScrollBar={false} size={40}>
					<form className="space-y-6 p-8" onSubmit={handleFormSubmit}>
						{config.rows.map((row, index) => (
							<FormRow
								errors={errors}
								fieldData={fieldData}
								key={index}
								register={register}
								row={row}
							/>
						))}

						<div className="flex justify-center pt-4">
							<button className={submitButtonClasses} type="submit">
								{submitButtonText}
							</button>
						</div>
					</form>
				</ScrollShadow>
			</div>
		</>
	);
}
