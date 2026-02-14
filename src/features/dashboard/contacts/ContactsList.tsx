"use client";

import { Suspense } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useContactsStore } from "./core/store";
import { useDebugStore } from "@/hooks/useDebugStore";
import { ContactsForm } from "./components/ContactsForm";
import { ContactsTable } from "./components/ContactsTable";
import { ContactsToolbar } from "./components/ContactsToolbar";

export default function ContactsList() {
  useDebugStore("ContactsStore", useContactsStore);

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
