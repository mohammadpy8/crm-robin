// src/features/dashboard/leads/LeadsList.tsx
"use client";

import { Suspense } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useDebugStore } from "@/hooks/useDebugStore";
import { useLeadsStore } from "./core/store";
import { LeadsForm } from "./components/LeadsForm";
import { LeadsTable } from "./components/LeadsTable";
import { LeadsToolbar } from "./components/LeadsToolbar";

export default function LeadsList() {
  useDebugStore("LeadsStore", useLeadsStore);

  return (
    <>
      <LeadsForm />

      <ToolbarProvider defaultFilter={{ label: "همه سرنخ ها", value: "all" }}>
        <LeadsToolbar />
      </ToolbarProvider>

      <div>
        <Suspense fallback={null}>
          <LeadsTable />
        </Suspense>
      </div>
    </>
  );
}
