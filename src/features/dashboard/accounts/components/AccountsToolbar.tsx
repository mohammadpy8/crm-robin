"use client";

import { useCallback, useEffect, useState } from "react";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import { getAccountsToolbarConfig } from "../configs/toolbar.config";
import { useAccountsQuery, useDeleteAccount, useRefreshAccounts } from "../core/api";
import { useAccountsStore } from "../core/store";
import { DeleteModal } from "@/features/shared/ui/components/DeleteModal";
import { useUserStore } from "@/store/useUserStore.";

export function AccountsToolbar() {
  const { setSelectedCount } = useToolbarContext();
  const { selectedIds, setSelectedIds, openForm, setToolbarFilter } = useAccountsStore();
  const { users } = useUserStore();
  const { data = [] } = useAccountsQuery();
  const deleteAccount = useDeleteAccount();
  const refreshAccounts = useRefreshAccounts();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setSelectedCount(selectedIds.length);
  }, [selectedIds, setSelectedCount]);

  const handlers: ToolbarHandlers = {
    // ✅ دکمه‌های بدون popover
    onActionButtonClick: (id) => {
      console.log("Button clicked:", id);

      if (id === "bulk-update") {
        console.log("Refreshing accounts...");
        refreshAccounts();
      }

      if (id === "delete") {
        const item = data.find((d) => d.id === selectedIds[0]);
        setName((item as { name?: string })?.name || "");
        setOpen(true);
      }
    },

    // ✅ دکمه‌هایی که popover دارند
    onActionButtonPopoverConfirm: (buttonId, selectedValues) => {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📌 Button ID:", buttonId);
      console.log("📌 Selected Values:", selectedValues);
      console.log("📌 Selected Accounts:", selectedIds);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      if (buttonId === "change-level") {
        const newLevel = selectedValues[0]; // "bronze" | "silver" | "gold"
        console.log(`🎯 تغییر سطح ${selectedIds.length} سازمان به: ${newLevel}`);
        // اینجا API call بزن:
        // await updateAccountsLevel(selectedIds, newLevel);
        // مثال:
        // updateAccountsLevel.mutate({
        //   accountIds: selectedIds,
        //   level: newLevel
        // });
      }

      if (buttonId === "change-status") {
        const newStatus = selectedValues[0]; // "active" | "inactive" | ...
        console.log(`🎯 تغییر وضعیت ${selectedIds.length} سازمان به: ${newStatus}`);

        // اینجا API call بزن:
        // await updateAccountsStatus(selectedIds, newStatus);
      }

      if (buttonId === "assign") {
        const userId = selectedValues[0]; // ID کاربری که انتخاب شده
        console.log(`🎯 ارجاع ${selectedIds.length} سازمان به کاربر با ID: ${userId}`);

        // اینجا API call بزن:
        // await assignAccountsToUser(selectedIds, userId);
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
      <Toolbar config={getAccountsToolbarConfig(users)} handlers={handlers} />
      <DeleteModal
        entityType='سازمان'
        entityName={name}
        isOpen={open}
        isLoading={deleteAccount.isPending}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
