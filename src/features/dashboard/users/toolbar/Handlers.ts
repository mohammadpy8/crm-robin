/** biome-ignore-all lint/style/useDefaultSwitchClause: <> */
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";

const toolbarHandlers: ToolbarHandlers = {
	onActionButtonClick: (buttonId) => {
		console.log("Action button clicked:", buttonId);

		switch (buttonId) {
			case "bulk-update":
				console.log("Bulk update users");
				break;
			case "reset-password":
				console.log("Reset passwords");
				break;
			case "delete":
				console.log("Delete selected users");
				break;
		}
	},

	onActionButtonPopoverConfirm: (buttonId, selectedValues) => {
		console.log(`Popover confirmed for ${buttonId}:`, selectedValues);

		if (buttonId === "assign-to") {
			console.log("Assigned to:", selectedValues);
		}
	},
	onCreateClick: () => {
		console.log("Create new user");
	},
	onCreateDropdownClick: (option) => {
		console.log("Create dropdown option clicked:", option);
	},
	onFilterChange: (value, label) => {
		console.log("Filter changed:", value, label);
	},
	onMoreClick: () => {
		console.log("More button clicked");
	},
	onMoreOptionClick: (option) => {
		console.log("More option clicked:", option.value);
		option.onClick?.();
	},
};
 
export default toolbarHandlers;
