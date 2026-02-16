/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: <> */
"use client";

import { useCallback, useEffect, useState } from "react";
import { DeleteModal } from "@/features/shared/ui/components/DeleteModal";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import { usersToolbarConfig } from "../configs/toolbar.config";
import { useDeleteUser, useRefreshUsers, useUsersQuery } from "../core/api";
import { useUsersStore } from "../core/store";

export function UsersToolbar() {
	const { setSelectedCount } = useToolbarContext();
	const { selectedIds, setSelectedIds, openForm, setToolbarFilter } = useUsersStore();
	const { data = [] } = useUsersQuery();
	const deleteUser = useDeleteUser();
	const refreshUsers = useRefreshUsers();

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [entityName, setEntityName] = useState("");

	useEffect(() => {
		setSelectedCount(selectedIds.length);
	}, [selectedIds, setSelectedCount]);

	const handlers: ToolbarHandlers = {
		onActionButtonClick: (id) => {
			if (id === "delete") {
				if (selectedIds.length === 1) {
					const item = data.find((d) => d.id === selectedIds[0]);
					setEntityName((item as { fullName?: string })?.fullName || "");
				} else {
					setEntityName(`${selectedIds.length} کاربر`);
				}
				setDeleteModalOpen(true);
			}

			if (id === "bulk-update") {
				useUsersStore.getState().resetSelection();
				refreshUsers();
			}

			if (id === "reset-password") {
				if (selectedIds.length === 1) {
					const item = data.find((d) => d.id === selectedIds[0]);
					if (item) {
						openForm("edit", {
							email: (item as { email?: string })?.email || "",
							fullName: (item as { fullName?: string })?.fullName || "",
							id: String(item.id),
							mobile: (item as { phone?: string })?.phone || "",
						});
					}
				}
			}
		},

		onCreateClick: () => openForm("create"),

		onFilterChange: (value) => {
			setToolbarFilter(value);
		},
	};

	const handleDelete = useCallback(async () => {
		if (selectedIds.length === 0) {return;}
		setIsDeleting(true);
		try {
			await deleteUser.mutateAsync(selectedIds[0]);
			setSelectedIds([]);
			setDeleteModalOpen(false);
			refreshUsers();
		} catch (error) {
			console.error("Error deleting user:", error);
		} finally {
			setIsDeleting(false);
		}
	}, [selectedIds, deleteUser, setSelectedIds, refreshUsers]);

	return (
		<>
			<Toolbar config={usersToolbarConfig} handlers={handlers} />

			<DeleteModal
				entityName={entityName}
				entityType="کاربر"
				isLoading={isDeleting}
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onConfirm={handleDelete}
			/>
		</>
	);
}
