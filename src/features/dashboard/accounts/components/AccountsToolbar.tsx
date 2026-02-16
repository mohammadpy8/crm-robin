"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/api/core/httpClient";
import { companyService } from "@/api/services";
import type { CompanyLevel, CompanyStatus } from "@/api/types";
import { DeleteModal } from "@/features/shared/ui/components/DeleteModal";
import { FileUploadModal } from "@/features/shared/ui/components/FileUploadModal";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import { showToast } from "@/lib/utils/toast";
import { useUserStore } from "@/store/useUserStore.";
import { getAccountsToolbarConfig } from "../configs/toolbar.config";
import { useAccountsQuery, useRefreshAccounts } from "../core/api";
import { useAccountsStore } from "../core/store";

export function AccountsToolbar() {
	const { setSelectedCount } = useToolbarContext();
	const { selectedIds, setSelectedIds, openForm, setToolbarFilter } = useAccountsStore();
	const { users } = useUserStore();
	const { data = [] } = useAccountsQuery();
	const refreshAccounts = useRefreshAccounts();

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
			const result = await companyService.importExcel(file, 1);
			showToast.success(`${result.imported} سازمان با موفقیت وارد شد`);
			if (result.failed && result.failed > 0) {
				showToast.info(`${result.failed} سازمان با خطا مواجه شد`);
			}
			setUploadModalOpen(false);
			refreshAccounts();
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
					setEntityName(item?.name ?? "");
				} else {
					setEntityName(`${selectedIds.length} سازمان`);
				}
				setDeleteModalOpen(true);
			}

			if (id === "refresh") {
				useAccountsStore.getState().resetSelection();
				refreshAccounts();
			}
		},

		onActionButtonPopoverConfirm: async (buttonId, selectedValues) => {
			try {
				if (buttonId === "change-level") {
					const level = selectedValues[0] as CompanyLevel;
					await companyService.bulkChangeLevel({
						companyIds: selectedIds,
						level,
					});
					showToast.success("سطح سازمان‌ها با موفقیت تغییر کرد");
					setSelectedIds([]);
					refreshAccounts();
				}

				if (buttonId === "change-status") {
					const status = selectedValues[0] as CompanyStatus;
					await companyService.bulkChangeStatus({
						companyIds: selectedIds,
						status,
					});
					showToast.success("وضعیت سازمان‌ها با موفقیت تغییر کرد");
					setSelectedIds([]);
					refreshAccounts();
				}

				if (buttonId === "assign") {
					const userId = Number(selectedValues[0]);
					await companyService.bulkAssign({
						assignedToUserId: userId,
						companyIds: selectedIds,
					});
					showToast.success("سازمان‌ها با موفقیت تخصیص داده شدند");
					setSelectedIds([]);
					refreshAccounts();
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
			await companyService.bulkDelete({
				companyIds: selectedIds,
			});
			showToast.success(
				selectedIds.length === 1
					? "سازمان با موفقیت حذف شد"
					: `${selectedIds.length} سازمان با موفقیت حذف شدند`,
			);
			setSelectedIds([]);
			setDeleteModalOpen(false);
			refreshAccounts();
		} catch (error) {
			showToast.error(getErrorMessage(error));
		} finally {
			setIsDeleting(false);
		}
	}, [selectedIds, setSelectedIds, refreshAccounts]);

	return (
		<>
			<Toolbar config={getAccountsToolbarConfig(users)} handlers={handlers} />

			<DeleteModal
				entityName={entityName}
				entityType="سازمان"
				isLoading={isDeleting}
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onConfirm={handleDelete}
			/>

			<FileUploadModal
				acceptedFormats={[".xlsx", ".xls"]}
				description="فایل اکسل حاوی اطلاعات سازمان‌ها را انتخاب کنید"
				isLoading={isUploading}
				isOpen={uploadModalOpen}
				maxSizeMB={10}
				onClose={() => setUploadModalOpen(false)}
				onSubmit={handleFileUpload}
				title="آپلود فایل اکسل سازمان‌ها"
			/>
		</>
	);
}
