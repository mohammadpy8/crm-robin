"use client";

import { useCallback, useEffect, useState } from "react";
import { DeleteModal } from "@/features/shared/ui/components/DeleteModal";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import { usersToolbarConfig } from "../configs/toolbar.config";
import { useDeleteUser, useRefreshUsers, useUsersQuery } from "../core/api";
import { useUsersStore } from "../core/store";

const useUsersToolbar = () => {
	const selectedFilter = useUsersStore((state) => state.selectedFilter);
	const selectedIds = useUsersStore((state) => state.selectedIds);
	const setSelectedIds = useUsersStore((state) => state.setSelectedIds);
	const openForm = useUsersStore((state) => state.openForm);
	const setToolbarFilter = useUsersStore((state) => state.setToolbarFilter);

	const selectedCount = selectedIds.length;
	const { setSelectedCount } = useToolbarContext();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [userNameToDelete, setUserNameToDelete] = useState<string>("");

	const deleteUser = useDeleteUser();
	const refreshUsers = useRefreshUsers();
	const { data: users = [] } = useUsersQuery();

	useEffect(() => {
		setSelectedCount(selectedCount);
	}, [setSelectedCount, selectedCount]);

	const handleDeleteConfirm = useCallback(async () => {
		const { selectedIds: currentSelectedIds } = useUsersStore.getState();
		if (currentSelectedIds.length === 0) {
			return;
		}

		await deleteUser.mutateAsync(currentSelectedIds[0]);
		setSelectedIds([]);
		setIsDeleteModalOpen(false);
	}, [deleteUser, setSelectedIds]);

	const handleDeleteCancel = useCallback(() => {
		setIsDeleteModalOpen(false);
		setUserNameToDelete("");
	}, []);

	const handlers: ToolbarHandlers = {
		onActionButtonClick: (buttonId: string): void => {
			const { selectedIds: currentSelectedIds } = useUsersStore.getState();

			switch (buttonId) {
				case "bulk-update": {
					refreshUsers();
					break;
				}
				case "reset-password": {
					openForm("edit");
					break;
				}
				case "delete": {
					if (currentSelectedIds.length === 0) {
						return;
					}

					const user = users.find((u) => u.id === currentSelectedIds[0]);
					const name = (user as { fullName?: string })?.fullName || "";
					setUserNameToDelete(name);
					setIsDeleteModalOpen(true);
					break;
				}
				default: {
					break;
				}
			}
		},

		onCreateClick: (): void => {
			openForm("create");
		},

		onFilterChange: (value: string): void => {
			setToolbarFilter(value);
		},
	};

	return {
		deleteModal: {
			isLoading: deleteUser.isPending,
			isOpen: isDeleteModalOpen,
			onClose: handleDeleteCancel,
			onConfirm: handleDeleteConfirm,
			userName: userNameToDelete,
		},
		handlers,
		state: {
			selectedCount,
			selectedFilter,
		},
	};
};

export function UsersToolbar() {
	const { handlers, deleteModal } = useUsersToolbar();

	return (
		<div className="w-full">
			<Toolbar config={usersToolbarConfig} handlers={handlers} />

			<DeleteModal
				entityName={deleteModal.userName}
				entityType="کاربر"
				isLoading={deleteModal.isLoading}
				isOpen={deleteModal.isOpen}
				onClose={deleteModal.onClose}
				onConfirm={deleteModal.onConfirm}
			/>
		</div>
	);
}
