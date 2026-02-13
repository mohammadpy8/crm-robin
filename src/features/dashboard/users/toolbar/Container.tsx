"use client";

import { Toolbar } from "@/features/shared/ui/toolbar";
import { DeleteConfirmModal } from "../ui/DeleteConfirmModal";
import usersToolbarConfig from "./config";
import { useToolbarHandlers } from "./handlers";

export default function UsersToolbarContainer() {
	const { handlers, deleteModal } = useToolbarHandlers();

	return (
		<div className="w-full">
			<Toolbar config={usersToolbarConfig} handlers={handlers} />

			<DeleteConfirmModal
				isLoading={deleteModal.isLoading}
				isOpen={deleteModal.isOpen}
				onClose={deleteModal.onClose}
				onConfirm={deleteModal.onConfirm}
				userName={deleteModal.userName}
			/>
		</div>
	);
}
