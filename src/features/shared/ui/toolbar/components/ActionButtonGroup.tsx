"use client";

import { ActionButton } from "@/features/shared/ui/toolbar/components/ActionButton";
import { SelectionCounter } from "@/features/shared/ui/toolbar/components/SelectionCounter";
import type { ActionButton as ActionButtonType } from "@/features/shared/ui/toolbar/types/toolbar.types";

interface ActionButtonGroupProps {
	actionButtons: ActionButtonType[];
	selectedCount: number;
	showSelectionCount: boolean;
}

export const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({
	actionButtons,
	selectedCount,
	showSelectionCount,
}) => {
	return (
		<div className="flex items-center gap-2">
			{showSelectionCount && <SelectionCounter count={selectedCount} />}

			{actionButtons.map((button) => (
				<ActionButton key={button.id} {...button} />
			))}
		</div>
	);
};
