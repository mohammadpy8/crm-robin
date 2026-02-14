"use client";

import { useCallback, useEffect, useState } from "react";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import { accountsToolbarConfig } from "../configs/toolbar.config";
import { useAccountsQuery, useDeleteAccount, useRefreshAccounts } from "../core/api";
import { useAccountsStore } from "../core/store";
import { DeleteModal } from "./DeleteModal";

export function AccountsToolbar() {
	const { setSelectedCount } = useToolbarContext();
	const { selectedIds, setSelectedIds, openForm, setToolbarFilter } = useAccountsStore();
	const { data = [] } = useAccountsQuery();
	const deleteAccount = useDeleteAccount();
	const refreshAccounts = useRefreshAccounts();

	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");

	useEffect(() => {
		setSelectedCount(selectedIds.length);
	}, [selectedIds, setSelectedCount]);

	const handlers: ToolbarHandlers = {
		onActionButtonClick: (id) => {
			if (id === "bulk-update") refreshAccounts();
			if (id === "delete") {
				const item = data.find((d) => d.id === selectedIds[0]);
				setName((item as { name?: string })?.name || "");
				setOpen(true);
			}
		},
		onCreateClick: () => openForm("create"),
		onFilterChange: (v) => setToolbarFilter(v),
	};

	const handleDelete = useCallback(async () => {
		await deleteAccount.mutateAsync(selectedIds[0]);
		setSelectedIds([]);
		setOpen(false);
	}, [deleteAccount, selectedIds, setSelectedIds]);

	return (
		<>
			<Toolbar config={accountsToolbarConfig} handlers={handlers} />
			<DeleteModal
				accountName={name}
				isLoading={deleteAccount.isPending}
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={handleDelete}
			/>
		</>
	);
}
