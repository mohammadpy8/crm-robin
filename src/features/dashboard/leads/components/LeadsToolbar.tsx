"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/api/core/httpClient";
import { leadService } from "@/api/services";
import type { LeadStatus } from "@/api/types";
import { DeleteModal } from "@/features/shared/ui/components/DeleteModal";
import { FileUploadModal } from "@/features/shared/ui/components/FileUploadModal";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import { showToast } from "@/lib/utils/toast";
import { useUserStore } from "@/store/useUserStore.";
import { getLeadsToolbarConfig } from "../configs/toolbar.config";
import { useLeadsQuery, useRefreshLeads } from "../core/api";
import { useLeadsStore } from "../core/store";

export function LeadsToolbar() {
	const { setSelectedCount } = useToolbarContext();
	const { selectedIds, setSelectedIds, openForm, setToolbarFilter } = useLeadsStore();
	const { users = [] } = useUserStore();
	const { data = [] } = useLeadsQuery();
	const refreshLeads = useRefreshLeads();

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [uploadModalOpen, setUploadModalOpen] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [entityName, setEntityName] = useState("");

	useEffect(() => {
		setSelectedCount(selectedIds.length);
	}, [selectedIds, setSelectedCount]);

	const handleFileUpload = async (file: File) => {
		setIsUploading(true);
		try {
			const result = await leadService.importExcel(file, 1);
			showToast.success(`${result.imported} سرنخ با موفقیت وارد شد`);
			if (result.failed && result.failed > 0) {
				showToast.info(`${result.failed} سرنخ با خطا مواجه شد`);
			}
			setUploadModalOpen(false);
			refreshLeads();
		} catch (error) {
			showToast.error(getErrorMessage(error));
		} finally {
			setIsUploading(false);
		}
	};

	const handlers: ToolbarHandlers = {
		onActionButtonClick: (id) => {
			if (id === "delete") {
				if (selectedIds.length === 1) {
					const item = data.find((d) => d.id === selectedIds[0]);
					setEntityName(`${item?.firstName} ${item?.lastName}` || "");
				} else {
					setEntityName(`${selectedIds.length} سرنخ`);
				}
				setDeleteModalOpen(true);
			}

			if (id === "bulk-update") {
				useLeadsStore.getState().resetSelection();
				refreshLeads();
			}
		},

		onActionButtonPopoverConfirm: async (buttonId, selectedValues) => {
			try {
				if (buttonId === "change-status") {
					const status = selectedValues[0] as LeadStatus;
					await leadService.bulkChangeStatus({
						leadIds: selectedIds,
						status,
					});
					showToast.success("وضعیت سرنخ‌ها با موفقیت تغییر کرد");
					setSelectedIds([]);
					refreshLeads();
				}

				if (buttonId === "assign") {
					const userId = Number(selectedValues[0]);
					await leadService.bulkAssign({
						assignedToUserId: userId,
						leadIds: selectedIds,
					});
					showToast.success("سرنخ‌ها با موفقیت تخصیص داده شدند");
					setSelectedIds([]);
					refreshLeads();
				}
			} catch (error) {
				showToast.error(getErrorMessage(error));
			}
		},

		onCreateClick: () => openForm("create"),

		onCreateDropdownClick: (option) => {
			if (option.value === "import-excel") {
				setUploadModalOpen(true);
			}
		},

		onFilterChange: (value) => {
			setToolbarFilter(value);
		},
	};

	const handleDelete = useCallback(async () => {
		setIsDeleting(true);
		try {
			await leadService.bulkDelete({
				leadIds: selectedIds,
			});
			showToast.success(
				selectedIds.length === 1
					? "سرنخ با موفقیت حذف شد"
					: `${selectedIds.length} سرنخ با موفقیت حذف شدند`,
			);
			setSelectedIds([]);
			setDeleteModalOpen(false);
			refreshLeads();
		} catch (error) {
			showToast.error(getErrorMessage(error));
		} finally {
			setIsDeleting(false);
		}
	}, [selectedIds, setSelectedIds, refreshLeads]);

	return (
		<>
			<Toolbar config={getLeadsToolbarConfig(users)} handlers={handlers} />

			<DeleteModal
				entityName={entityName}
				entityType="سرنخ"
				isLoading={isDeleting}
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onConfirm={handleDelete}
			/>

			<FileUploadModal
				acceptedFormats={[".xlsx", ".xls"]}
				description="فایل اکسل حاوی اطلاعات سرنخ‌ها را انتخاب کنید"
				isLoading={isUploading}
				isOpen={uploadModalOpen}
				maxSizeMB={10}
				onClose={() => setUploadModalOpen(false)}
				onSubmit={handleFileUpload}
				title="آپلود فایل اکسل سرنخ‌ها"
			/>
		</>
	);
}
