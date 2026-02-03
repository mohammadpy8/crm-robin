"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FieldDataMap, RowConfig } from "../types";
import { FormField } from "./FormField";

interface FormRowProps {
	row: RowConfig;
	register: UseFormRegister<Record<string, unknown>>;
	errors: FieldErrors<Record<string, unknown>>;
	fieldData?: FieldDataMap;
}

export function FormRow({ row, register, errors, fieldData }: FormRowProps) {
	const { fields } = row;

	const allFullWidth = fields.every((field) => field.fullWidth === true);
	const isSingleField = fields.length === 1;

	if (allFullWidth || isSingleField) {
		const shouldCenterSingleField = isSingleField && !fields[0].fullWidth;

		return (
			<div className={shouldCenterSingleField ? "flex justify-center" : ""}>
				<div className={shouldCenterSingleField ? "w-1/2" : "w-full space-y-6"}>
					{fields.map((field) => (
						<FormField
							errors={errors}
							field={field}
							fieldData={fieldData?.[field.name]}
							key={field.name}
							register={register}
						/>
					))}
				</div>
			</div>
		);
	}

	const gridColumnsClass =
		fields.length === 2 ? "lg:grid-cols-2" : `lg:grid-cols-${fields.length}`;

	return (
		<div className={`grid grid-cols-1 ${gridColumnsClass} gap-4`}>
			{fields.map((field) => (
				<FormField
					errors={errors}
					field={field}
					fieldData={fieldData?.[field.name]}
					key={field.name}
					register={register}
				/>
			))}
		</div>
	);
}
