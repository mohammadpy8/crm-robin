// toolbar"use client";

import { useEffect, useState, useCallback } from "react";
import { Toolbar, useToolbarContext } from "@/features/shared/ui/toolbar";
import type { ToolbarHandlers } from "@/features/shared/ui/toolbar";
import { contactsToolbarConfig } from "../configs/toolbar.config";
import { useContactsStore } from "../core/store";
import { useContactsQuery, useDeleteContact, useRefreshContacts } from "../core/api";
import { DeleteModal } from "./DeleteModal";

export function ContactsToolbar() {
  const { setSelectedCount } = useToolbarContext();
  const { selectedIds, setSelectedIds, openForm, setToolbarFilter } = useContactsStore();
  const { data = [] } = useContactsQuery();
  const deleteContact = useDeleteContact();
  const refreshContacts = useRefreshContacts();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setSelectedCount(selectedIds.length);
  }, [selectedIds, setSelectedCount]);

  const handlers: ToolbarHandlers = {
    onCreateClick: () => openForm("create"),
    onFilterChange: (v) => setToolbarFilter(v),
    onActionButtonClick: (id) => {
      if (id === "bulk-update") refreshContacts();
      if (id === "delete") {
        const item = data.find((d) => d.id === selectedIds[0]);
        setName(`${item?.firstName || ""} ${item?.lastName || ""}`);
        setOpen(true);
      }
    },
  };

  const handleDelete = useCallback(async () => {
    await deleteContact.mutateAsync(selectedIds[0]);
    setSelectedIds([]);
    setOpen(false);
  }, [deleteContact, selectedIds, setSelectedIds]);

  return (
    <>
      <Toolbar config={contactsToolbarConfig} handlers={handlers} />
      <DeleteModal
        isOpen={open}
        contactName={name}
        isLoading={deleteContact.isPending}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
