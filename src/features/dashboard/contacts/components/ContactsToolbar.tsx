"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/api/core/httpClient";
import { contactService } from "@/api/services";
import { DeleteModal } from "@/features/shared/ui/components/DeleteModal";
import { FileUploadModal } from "@/features/shared/ui/components/FileUploadModal";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import { showToast } from "@/lib/utils/toast";
import { useUserStore } from "@/store/useUserStore.";
import { getContactsToolbarConfig } from "../configs/toolbar.config";
import { useContactsQuery, useRefreshContacts } from "../core/api";
import { useContactsStore } from "../core/store";

export function ContactsToolbar() {
  const { setSelectedCount } = useToolbarContext();
  const { selectedIds, setSelectedIds, openForm, setToolbarFilter } = useContactsStore();
  const { users = [] } = useUserStore();
  const { data = [] } = useContactsQuery();
  const refreshContacts = useRefreshContacts();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [entityName, setEntityName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    setSelectedCount(selectedIds.length);
  }, [selectedIds, setSelectedCount]);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await contactService.importExcel(file);
      showToast.success(result.message);
      if (result.failed && result.failed > 0) {
        showToast.info("افزودن مخاطبین با خطا مواجه شد");
      }
      setUploadModalOpen(false);
      refreshContacts();
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
          setEntityName(`${selectedIds.length} مخاطب`);
        }
        setDeleteModalOpen(true);
      }

      if (id === "bulk-update") {
        useContactsStore.getState().resetSelection();
        refreshContacts();
      }
    },

    onActionButtonPopoverConfirm: async (buttonId, selectedValues) => {
      try {
        if (buttonId === "assign") {
          const userId = Number(selectedValues[0]);
          await contactService.bulkAssign({
            assignedToUserId: userId,
            contactIds: selectedIds,
          });
          showToast.success("مخاطبین با موفقیت تخصیص داده شدند");
          setSelectedIds([]);
          refreshContacts();
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
      await contactService.bulkDelete({
        contactIds: selectedIds,
      });
      showToast.success(
        selectedIds.length === 1 ? "مخاطب با موفقیت حذف شد" : `${selectedIds.length} مخاطب با موفقیت حذف شدند`,
      );
      setSelectedIds([]);
      setDeleteModalOpen(false);
      refreshContacts();
    } catch (error) {
      showToast.error(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }, [selectedIds, setSelectedIds, refreshContacts]);

  return (
    <>
      <Toolbar config={getContactsToolbarConfig(users)} handlers={handlers} />

      <DeleteModal
        entityName={entityName}
        entityType='مخاطب'
        isLoading={isDeleting}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <FileUploadModal
        acceptedFormats={[".xlsx", ".xls"]}
        description='فایل اکسل حاوی اطلاعات مخاطبین را انتخاب کنید'
        isLoading={isUploading}
        isOpen={uploadModalOpen}
        maxSizeMB={10}
        onClose={() => setUploadModalOpen(false)}
        onSubmit={handleFileUpload}
        title='آپلود فایل اکسل مخاطبین'
		resetKey={uploadModalOpen}
      />
    </>
  );
}
