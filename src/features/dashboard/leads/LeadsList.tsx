"use client";

import { Suspense, useEffect } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useUserStore } from "@/store/useUserStore.";
import { LeadsForm } from "./components/LeadsForm";
import { LeadsTable } from "./components/LeadsTable";
import { LeadsToolbar } from "./components/LeadsToolbar";

export default function LeadsList() {
  const { fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <LeadsForm />
      <ToolbarProvider defaultFilter={{ label: "همه سرنخ ها", value: "all" }}>
        <LeadsToolbar />
      </ToolbarProvider>
      <Suspense fallback={null}>
        <LeadsTable />
      </Suspense>
    </>
  );
}
