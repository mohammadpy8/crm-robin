"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useCallback, useMemo, useState } from "react";
import type { SelectOption } from "../../types";

interface SelectFilterProps {
	multiSelect?: boolean;
	onChange: (value: string[] | string) => void;
	options: SelectOption[];
	placeholder: string;
	value: string[] | string;
}

export const SelectFilter = ({
	multiSelect = false,
	onChange,
	options,
	placeholder,
	value,
}: SelectFilterProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSelect = useCallback(
		(optionValue: string): void => {
			if (multiSelect) {
				const currentValues = Array.isArray(value) ? value : [];
				const newValues = currentValues.includes(optionValue)
					? currentValues.filter((v) => v !== optionValue)
					: [...currentValues, optionValue];
				onChange(newValues);
			} else {
				onChange(optionValue);
			}
		},
		[multiSelect, onChange, value],
	);

	const displayText = useMemo(() => {
		if (Array.isArray(value) && value.length > 0) {
			return value
				.map((v) => options.find((opt) => opt.value === v)?.label || v)
				.join("، ");
		}
		if (!Array.isArray(value) && value) {
			return options.find((opt) => opt.value === value)?.label || value;
		}
		return "";
	}, [value, options]);

	const filteredOptions = useMemo(() => {
		return options.filter((opt) =>
			opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [options, searchTerm]);

	return (
		<Popover offset={10} placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<div className="w-full cursor-pointer">
					<input
						className="w-full cursor-pointer border-none bg-transparent px-2 py-1 font-medium text-secondary text-xs placeholder:font-medium placeholder:text-secondary focus:outline-none focus:ring-0"
						placeholder={placeholder}
						readOnly={true}
						type="text"
						value={displayText}
					/>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<div className="flex flex-col">
					<div className="border-b p-2">
						<input
							className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="جستجو..."
							type="text"
							value={searchTerm}
						/>
					</div>

					{multiSelect && Array.isArray(value) && value.length > 0 && (
						<button
							className="border-b px-2 py-1.5 text-right text-red-600 text-xs hover:bg-gray-100"
							onClick={() => {
								onChange([]);
								setSearchTerm("");
							}}
							type="button"
						>
							پاک کردن همه
						</button>
					)}

					<div className="max-h-48 overflow-y-auto">
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option) => {
								const isSelected = multiSelect
									? Array.isArray(value) && value.includes(option.value)
									: value === option.value;
								return (
									<button
										className={`w-full px-2 py-1.5 text-right text-xs transition-colors hover:bg-gray-100 ${
											isSelected
												? "bg-primary/10 font-medium text-primary"
												: "text-gray-700"
										}`}
										key={option.value}
										onClick={() => handleSelect(option.value)}
										type="button"
									>
										{option.label}
									</button>
								);
							})
						) : (
							<div className="px-2 py-1.5 text-center text-gray-400 text-xs">
								نتیجه‌ای یافت نشد
							</div>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
