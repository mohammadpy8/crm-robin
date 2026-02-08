"use client";

interface EmailCellProps {
	value: string | undefined;
}

export const EmailCell = ({ value }: EmailCellProps) => {
	if (!value) {
		return (
			<div className="pr-2 text-right">
				<span className="text-gray-400 text-xs">-</span>
			</div>
		);
	}

	return (
		<div className="pr-2 text-right">
			<a
				className="block truncate font-medium text-blue-400 text-xs hover:underline"
				href={`mailto:${value}`}
			>
				{value}
			</a>
		</div>
	);
};
