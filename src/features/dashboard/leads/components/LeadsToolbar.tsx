"use client";

import { useCallback, useEffect, useState } from "react";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import { leadsToolbarConfig } from "../configs/toolbar.config";
import { useDeleteLead, useLeadsQuery, useRefreshLeads } from "../core/api";
import { useLeadsStore } from "../core/store";
import { DeleteModal } from "./DeleteModal";

const useLeadsToolbar = () => {
	const selectedFilter = useLeadsStore((state) => state.selectedFilter);
	const selectedIds = useLeadsStore((state) => state.selectedIds);
	const setSelectedIds = useLeadsStore((state) => state.setSelectedIds);
	const openForm = useLeadsStore((state) => state.openForm);
	const setToolbarFilter = useLeadsStore((state) => state.setToolbarFilter);

	const selectedCount = selectedIds.length;
	const { setSelectedCount } = useToolbarContext();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [leadNameToDelete, setLeadNameToDelete] = useState<string>("");

	const deleteLead = useDeleteLead();
	const refreshLeads = useRefreshLeads();
	const { data: leads = [] } = useLeadsQuery();

	useEffect(() => {
		setSelectedCount(selectedCount);
	}, [setSelectedCount, selectedCount]);

	const handleDeleteConfirm = useCallback(async () => {
		const { selectedIds: currentSelectedIds } = useLeadsStore.getState();
		if (currentSelectedIds.length === 0) return;

		await deleteLead.mutateAsync(currentSelectedIds[0]);
		setSelectedIds([]);
		setIsDeleteModalOpen(false);
	}, [deleteLead, setSelectedIds]);

	const handleDeleteCancel = useCallback(() => {
		setIsDeleteModalOpen(false);
		setLeadNameToDelete("");
	}, []);

	const handlers: ToolbarHandlers = {
		onActionButtonClick: (buttonId: string): void => {
			const { selectedIds: currentSelectedIds } = useLeadsStore.getState();

			switch (buttonId) {
				case "bulk-update": {
					refreshLeads();
					break;
				}
				case "change-status": {
					// Handle status change
					break;
				}
				case "assign": {
					// Handle assign
					break;
				}
				case "delete": {
					if (currentSelectedIds.length === 0) return;

					const lead = leads.find((l) => l.id === currentSelectedIds[0]);
					const name = (lead as { firstName?: string; lastName?: string })?.firstName
						? `${(lead as { firstName?: string }).firstName} ${(lead as { lastName?: string }).lastName}`
						: "";
					setLeadNameToDelete(name);
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
			isLoading: deleteLead.isPending,
			isOpen: isDeleteModalOpen,
			leadName: leadNameToDelete,
			onClose: handleDeleteCancel,
			onConfirm: handleDeleteConfirm,
		},
		handlers,
		state: {
			selectedCount,
			selectedFilter,
		},
	};
};

export function LeadsToolbar() {
	const { handlers, deleteModal } = useLeadsToolbar();

	return (
		<div className="w-full">
			<Toolbar config={leadsToolbarConfig} handlers={handlers} />

			<DeleteModal
				isLoading={deleteModal.isLoading}
				isOpen={deleteModal.isOpen}
				leadName={deleteModal.leadName}
				onClose={deleteModal.onClose}
				onConfirm={deleteModal.onConfirm}
			/>
		</div>
	);
}
