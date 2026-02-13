import { useCallback, useEffect, useState } from "react";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { useToolbarContext } from "@/features/shared/ui/toolbar";
import { useDeleteUser, useRefreshUsers, useUsersQuery } from "../api";
import { useUsersStore } from "../store";

export const useToolbarHandlers = () => {
	const selectedFilter = useUsersStore((state) => state.selectedFilter);
	const selectedIds = useUsersStore((state) => state.selectedIds);
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
		setIsDeleteModalOpen(false);
	}, [deleteUser]);

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
					const { openForm } = useUsersStore.getState();
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
			const { openForm } = useUsersStore.getState();
			openForm("create");
		},

		onFilterChange: (value: string): void => {
			const { setToolbarFilter } = useUsersStore.getState();
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
