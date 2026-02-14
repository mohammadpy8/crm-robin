"use client";

import { Suspense } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useDebugStore } from "@/hooks/useDebugStore";
import { LeadsForm } from "./components/LeadsForm";
import { LeadsTable } from "./components/LeadsTable";
import { LeadsToolbar } from "./components/LeadsToolbar";
import { useLeadsStore } from "./core/store";

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
