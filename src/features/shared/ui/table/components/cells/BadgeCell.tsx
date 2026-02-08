"use client";

import type { BadgeConfig } from "../../types";

interface BadgeCellProps {
	value: string | undefined;
	badgeConfig?: BadgeConfig;
}

export const BadgeCell = ({ value, badgeConfig }: BadgeCellProps) => {
	if (!badgeConfig) {
		return (
			<div className="pr-2 text-right">
				<span className="font-medium text-gray-700 text-xs">{value || "-"}</span>
			</div>
		);
	}

	if (!value) {
		return (
			<div className="pr-2 text-right">
				<span className="font-medium text-gray-700 text-xs">-</span>
			</div>
		);
	}

	const config = badgeConfig[value];
	if (!config) {
		return (
			<div className="pr-2 text-right">
				<span className="font-medium text-gray-700 text-xs">{value}</span>
			</div>
		);
	}

	return (
		<div className="pr-2 text-right">
			<span
				className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-medium text-xs"
				style={{
					backgroundColor: config.bgColor,
					borderColor: `${config.textColor}40`,
					color: config.textColor,
				}}
			>
				{config.label}
			</span>
		</div>
	);
};
