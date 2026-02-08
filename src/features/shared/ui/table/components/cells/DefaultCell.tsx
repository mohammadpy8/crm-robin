"use client";

interface DefaultCellProps {
	value: string | undefined;
}

export const DefaultCell = ({ value }: DefaultCellProps) => {
	return (
		<div className="pr-2 text-right">
			<span className="font-medium text-gray-700 text-xs">{value}</span>
		</div>
	);
};
