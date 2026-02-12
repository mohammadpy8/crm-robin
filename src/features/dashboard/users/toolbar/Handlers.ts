/** biome-ignore-all lint/style/useDefaultSwitchClause: <> */

import { authService } from "@/api/services";
import {
	// type CreateButtonOption,
	type ToolbarHandlers,
	useToolbarContext,
} from "@/features/shared/ui/toolbar";
import { useUsersStore } from "../store";
import { mapUserListToTableRows } from "../utils";

export const createToolbarHandlers = (): ToolbarHandlers => {
	const setTableData = useUsersStore((state) => state.setTableData);
	const setTableLoading = useUsersStore((state) => state.setTableLoading);

	return {
		onActionButtonClick: async (buttonId: string): Promise<void> => {
			const { selectedIds } = useUsersStore.getState();

			switch (buttonId) {
				case "bulk-update": {
					setTableLoading(true);
					const updatedUserList = await authService.getUserList();
					const mappedData = mapUserListToTableRows(updatedUserList);
					setTableData(mappedData);
					setTableLoading(false);
					break;
				}
				case "reset-password": {
					const { openForm } = useUsersStore.getState();
					openForm("edit");
					break;
				}
				case "delete": {
					authService.deleteUser(selectedIds[0]);
					const updatedUserList = await authService.getUserList();
					const mappedData = mapUserListToTableRows(updatedUserList);
					setTableData(mappedData);
					break;
				}
			}
		},

		// onActionButtonPopoverConfirm: (buttonId: string, selectedValues: string[]): void => {
		// 	console.log("✅ Popover confirmed:", { buttonId, selectedValues });
		// },

		onCreateClick: (): void => {
			const { openForm } = useUsersStore.getState();
			openForm("create");
		},

		// onCreateDropdownClick: (option: CreateButtonOption): void => {
		// 	console.log("📋 Create dropdown option clicked:", option);
		// },

		onFilterChange: (value: string): void => {
			const { setToolbarFilter } = useUsersStore.getState();
			setToolbarFilter(value);
		},

		// onMoreClick: (): void => {
		// 	console.log("⋯ More button clicked");
		// },

		// onMoreOptionClick: (option: { value: string; onClick?: () => void }): void => {
		// console.log("📌 More option clicked:", option.value);
		// option.onClick?.();
		// },
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
