/** biome-ignore-all lint/style/useDefaultSwitchClause: <> */

import { type ToolbarHandlers, useToolbarContext } from "@/features/shared/ui/toolbar";
import { useUsersStore } from "../store";

export const createToolbarHandlers = (): ToolbarHandlers => {
	return {
		onActionButtonClick: (buttonId: string): void => {
			console.log("🔘 Action button clicked:", buttonId);

			const { selectedIds } = useUsersStore.getState();

			switch (buttonId) {
				case "bulk-update":
					console.log("📝 Bulk update users:", selectedIds);
					break;
				case "reset-password":
					console.log("🔑 Reset passwords:", selectedIds);
					break;
				case "delete":
					console.log("🗑️ Delete selected users:", selectedIds);
					break;
			}
		},

		onActionButtonPopoverConfirm: (buttonId: string, selectedValues: string[]): void => {
			console.log("✅ Popover confirmed:", { buttonId, selectedValues });
		},

		onCreateClick: (): void => {
			console.log("➕ Create new user");
			const { openForm } = useUsersStore.getState();
			openForm("create");
		},

		onCreateDropdownClick: (option: string): void => {
			console.log("📋 Create dropdown option clicked:", option);
		},

		onFilterChange: (value: string, label: string): void => {
			console.log("🔍 Filter changed:", { label, value });
			const { setToolbarFilter } = useUsersStore.getState();
			setToolbarFilter(value);
		},

		onMoreClick: (): void => {
			console.log("⋯ More button clicked");
		},

		onMoreOptionClick: (option: { value: string; onClick?: () => void }): void => {
			console.log("📌 More option clicked:", option.value);
			option.onClick?.();
		},
	};
};

export const useToolbarHandlers = () => {
	const selectedFilter = useUsersStore((state) => state.selectedFilter);
	const selectedIds = useUsersStore((state) => state.selectedIds);
	const selectedCount = selectedIds.length;
	const { setSelectedCount } = useToolbarContext();
	setSelectedCount(selectedCount);

	return {
		handlers: createToolbarHandlers(),
		state: {
			selectedCount: selectedCount,
			selectedFilter,
		},
	};
};
