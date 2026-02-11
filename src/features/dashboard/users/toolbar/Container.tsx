"use client";

import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import usersToolbarConfig from "./config";
import toolbarHandlers from "./handlers";

export default function UsersToolbarContainer() {
	const { selectedCount, selectedFilter } = useToolbarContext();

	console.log("Selected Filter is:", selectedFilter.value);
	console.log("Selected Count:", selectedCount);

	return (
		<div className="w-full">
			<Toolbar config={usersToolbarConfig} handlers={toolbarHandlers} />
		</div>
	);
}
