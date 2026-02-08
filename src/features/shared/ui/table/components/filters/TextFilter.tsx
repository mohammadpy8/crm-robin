"use client";

import { useEffect, useState } from "react";

interface TextFilterProps {
	onChange: (value: string) => void;
	onEnter: () => void;
	placeholder: string;
	value: string;
}

export const TextFilter = ({
	onChange,
	onEnter,
	placeholder,
	value,
}: TextFilterProps) => {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = e.target.value;
		setLocalValue(newValue);
		onChange(newValue);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			onEnter();
		}
	};

	return (
		<input
			className="w-full border-none bg-transparent px-2 py-1 font-medium text-secondary text-xs placeholder:font-medium placeholder:text-secondary focus:outline-none focus:ring-0"
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			placeholder={placeholder}
			type="text"
			value={localValue}
		/>
	);
};
