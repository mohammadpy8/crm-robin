"use client";

import { useEffect, useState, useCallback } from "react";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { accountsToolbarConfig } from "../configs/toolbar.config";
import { useAccountsStore } from "../core/store";
import { useAccountsQuery, useDeleteAccount, useRefreshAccounts } from "../core/api";
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
    onCreateClick: () => openForm("create"),
    onFilterChange: (v) => setToolbarFilter(v),
    onActionButtonClick: (id) => {
      if (id === "bulk-update") refreshAccounts();
      if (id === "delete") {
        const item = data.find((d) => d.id === selectedIds[0]);
        setName((item as { name?: string })?.name || "");
        setOpen(true);
      }
    },
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
        isOpen={open}
        accountName={name}
        isLoading={deleteAccount.isPending}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
