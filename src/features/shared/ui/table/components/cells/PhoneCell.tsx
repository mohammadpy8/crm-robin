"use client";

interface PhoneCellProps {
	value: string | undefined;
}

export const PhoneCell = ({ value }: PhoneCellProps) => {
	return (
		<div className="pr-2 text-right">
			<a
				className="font-medium text-blue-400 text-xs hover:underline"
				href={`tel:${value}`}
			>
				{value}
			</a>
		</div>
	);
};
