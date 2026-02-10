"use client";

import { ActionButton } from "@/features/shared/ui/toolbar/components/ActionButton";
import { SelectionCounter } from "@/features/shared/ui/toolbar/components/SelectionCounter";
import type {
	ActionButton as ActionButtonType,
	ToolbarHandlers,
} from "@/features/shared/ui/toolbar/types/toolbar.types";

interface ActionButtonGroupProps {
	actionButtons: ActionButtonType[];
	selectedCount: number;
	showSelectionCount: boolean;
	handlers?: ToolbarHandlers;
}

export const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({
	actionButtons,
	selectedCount,
	showSelectionCount,
	handlers = {},
}) => {
	const visibleButtons = actionButtons.filter((button) => {
		const visibility = button.visibility || "any";

		if (visibility === "always") {
			return true;
		}
		if (visibility === "single") {
			return selectedCount === 1;
		}
		if (visibility === "multiple") {
			return selectedCount > 1;
		}
		if (visibility === "any") {
			return selectedCount > 0;
		}

		return true;
	});

	return (
		<div className="flex items-center gap-2">
			{showSelectionCount && <SelectionCounter count={selectedCount} />}

			{visibleButtons.map((button) => {
				const shouldDisable = button.disableOnMultiple && selectedCount > 1;

				return (
					<ActionButton
						key={button.id}
						{...button}
						disabled={button.disabled || shouldDisable}
						onClick={() => handlers.onActionButtonClick?.(button.id)}
						onPopoverConfirm={(selectedValues) =>
							handlers.onActionButtonPopoverConfirm?.(button.id, selectedValues)
						}
					/>
				);
			})}
		</div>
	);
};
