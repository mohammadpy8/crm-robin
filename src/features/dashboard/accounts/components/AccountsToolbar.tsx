"use client";

import { useCallback, useEffect, useState } from "react";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { getAccountsToolbarConfig } from "../configs/toolbar.config";

import { useAccountsQuery, useDeleteAccount, useRefreshAccounts } from "../core/api";
import { useAccountsStore } from "../core/store";

import { DeleteModal } from "@/features/shared/ui/components/DeleteModal";
import { FileUploadModal } from "@/features/shared/ui/components/FileUploadModal";
import { companyService } from "@/api/services";
import { useUserStore } from "@/store/useUserStore.";
import { getErrorMessage } from "@/api/core/httpClient";

export function AccountsToolbar() {
  const { setSelectedCount } = useToolbarContext();

  const { selectedIds, setSelectedIds, openForm, setToolbarFilter } = useAccountsStore();

  const { users } = useUserStore();
  const { data = [] } = useAccountsQuery();

  const deleteAccount = useDeleteAccount();
  const refreshAccounts = useRefreshAccounts();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [entityName, setEntityName] = useState("");

  useEffect(() => {
    setSelectedCount(selectedIds.length);
  }, [selectedIds, setSelectedCount]);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assignedToUserId", "1");
      console.log("File name:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size);

      const response = await companyService.importExcel(formData as any);
      console.log("Success:", response);
      setUploadModalOpen(false);
      refreshAccounts();
    } catch (error) {
      console.error("Status:", error);
      console.error("خطا در آپلود فایل اکسل:", error);
      console.log(getErrorMessage(error));
    } finally {
      setIsUploading(false);
    }
  };

  const handlers: ToolbarHandlers = {
    onActionButtonClick: (id) => {
      if (id === "delete") {
        const item = data.find((d) => d.id === selectedIds[0]);
        setEntityName(item?.name ?? "");
        setDeleteModalOpen(true);
      }

      if (id === "refresh") {
        refreshAccounts();
      }
    },

    onActionButtonPopoverConfirm: (buttonId, selectedValues) => {
      if (buttonId === "change-level") {
        const level = selectedValues[0];
        console.log("Change level to:", level, selectedIds);
        // API CALL
      }

      if (buttonId === "change-status") {
        const status = selectedValues[0];
        console.log("Change status to:", status, selectedIds);
        // API CALL
      }

      if (buttonId === "assign") {
        const userId = selectedValues[0];
        console.log("Assign to user:", userId, selectedIds);
        // API CALL
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
    await deleteAccount.mutateAsync(selectedIds[0]);
    setSelectedIds([]);
    setDeleteModalOpen(false);
  }, [deleteAccount, selectedIds, setSelectedIds]);

  return (
    <>
      <Toolbar config={getAccountsToolbarConfig(users)} handlers={handlers} />

      <DeleteModal
        entityType='سازمان'
        entityName={entityName}
        isOpen={deleteModalOpen}
        isLoading={deleteAccount.isPending}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <FileUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSubmit={handleFileUpload}
        isLoading={isUploading}
        title='آپلود فایل اکسل سازمان‌ها'
        description='فایل اکسل حاوی اطلاعات سازمان‌ها را انتخاب کنید'
        acceptedFormats={[".xlsx", ".xls"]}
        maxSizeMB={10}
      />
    </>
  );
}
