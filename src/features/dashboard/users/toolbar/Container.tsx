"use client";

import { Toolbar } from "@/features/shared/ui/toolbar";
import usersToolbarConfig from "./config";
import { useToolbarHandlers } from "./handlers";

export default function UsersToolbarContainer() {
	const { handlers } = useToolbarHandlers();

	return (
		<div className="w-full">
			<Toolbar config={usersToolbarConfig} handlers={handlers} />
		</div>
	);
}
