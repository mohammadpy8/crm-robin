"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import type { DateRange } from "../../types";

interface DateRangeFilterProps {
	onChange: (value: DateRange) => void;
	placeholder: string;
	value: DateRange;
}

export const DateRangeFilter = ({
	onChange,
	placeholder,
	value,
}: DateRangeFilterProps) => {
	const [localValue, setLocalValue] = useState<DateRange>(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const displayText = useMemo(() => {
		if (localValue?.[0] && localValue?.[1]) {
			return `${localValue[0].format("YYYY/MM/DD")} - ${localValue[1].format("YYYY/MM/DD")}`;
		}
		if (localValue?.[0]) {
			return localValue[0].format("YYYY/MM/DD");
		}
		return placeholder;
	}, [localValue, placeholder]);

	const handleClear = useCallback(
		(e: React.MouseEvent): void => {
			e.stopPropagation();
			setLocalValue(null);
			onChange(null);
		},
		[onChange],
	);

	const handleDateChange = useCallback(
		(dates: DateObject[] | DateObject | null): void => {
			if (Array.isArray(dates) && dates.length === 2) {
				const newRange: DateRange = [dates[0], dates[1]];
				setLocalValue(newRange);
				onChange(newRange);
			} else if (Array.isArray(dates) && dates.length === 1) {
				const newRange: DateRange = [dates[0], null];
				setLocalValue(newRange);
				onChange(newRange);
			} else if (dates === null) {
				setLocalValue(null);
				onChange(null);
			}
		},
		[onChange],
	);

	const datePickerValue = localValue
		? localValue.filter((d): d is DateObject => d !== null)
		: undefined;

	return (
		<div className="flex w-full items-center gap-1">
			<DatePicker
				calendar={persian}
				containerClassName="w-full"
				inputClass="w-full border-none bg-transparent px-2 py-1 font-medium text-secondary text-xs placeholder:font-medium placeholder:text-secondary focus:outline-none focus:ring-0 cursor-pointer"
				locale={persian_fa}
				onChange={handleDateChange}
				placeholder={displayText}
				range={true}
				value={datePickerValue}
			/>
			{localValue?.[0] && (
				<button
					className="absolute left-1 z-50 shrink-0 rounded p-0.5 transition-colors hover:bg-gray-100"
					onClick={handleClear}
					type="button"
				>
					<X className="h-3 w-3 text-gray-400" />
				</button>
			)}
		</div>
	);
};
