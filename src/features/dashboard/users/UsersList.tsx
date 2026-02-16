"use client";

import { Suspense, useEffect } from "react";
import { ToolbarProvider } from "@/features/shared/ui/toolbar";
import { useRoleStore } from "@/store/useRoleStore";
import { UsersForm } from "./components/UsersForm";
import { UsersTable } from "./components/UsersTable";
import { UsersToolbar } from "./components/UsersToolbar";

export default function UsersList() {
  const { fetchRoles } = useRoleStore();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <>
      <UsersForm />
      <ToolbarProvider defaultFilter={{ label: "همه کاربران", value: "all" }}>
        <UsersToolbar />
      </ToolbarProvider>
      <Suspense fallback={null}>
        <UsersTable />
      </Suspense>
    </>
  );
}