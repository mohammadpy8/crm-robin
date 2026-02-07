"use client";

interface SelectionCounterProps {
	count: number;
}

export const SelectionCounter: React.FC<SelectionCounterProps> = ({ count }) => {
	return (
		<div className="flex items-center rounded-lg bg-gray-100 px-3 py-1.5">
			<span className="font-medium text-gray-700 text-sm">{count} مورد انتخاب شده</span>
		</div>
	);
};
