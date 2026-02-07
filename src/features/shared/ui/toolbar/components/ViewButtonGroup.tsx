"use client";

import { ViewButton } from "@/features/shared/ui/toolbar/components/ViewButton";
import type { ViewButton as ViewButtonType } from "@/features/shared/ui/toolbar/types/toolbar.types";

interface ViewButtonGroupProps {
	viewButtons: ViewButtonType[];
}

export const ViewButtonGroup: React.FC<ViewButtonGroupProps> = ({ viewButtons }) => {
	return (
		<div className="flex items-center gap-1 border-gray-200 pr-6">
			{viewButtons.map((button) => (
				<ViewButton
					active={button.active}
					disabled={button.disabled}
					href={button.href}
					icon={button.icon}
					key={button.id}
					label={button.label}
				/>
			))}
		</div>
	);
};
