"use client";

import { Suspense, useEffect } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useUserStore } from "@/store/useUserStore.";
import { ContactsForm } from "./components/ContactsForm";
import { ContactsTable } from "./components/ContactsTable";
import { ContactsToolbar } from "./components/ContactsToolbar";

export default function ContactsList() {
  const { fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <ContactsForm />
      <ToolbarProvider defaultFilter={{ label: "همه مخاطبین", value: "all" }}>
        <ContactsToolbar />
      </ToolbarProvider>
      <Suspense fallback={null}>
        <ContactsTable />
      </Suspense>
    </>
  );
}
