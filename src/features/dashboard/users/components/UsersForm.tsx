"use client";

import { useCallback, useEffect } from "react";
import { FormBuilder } from "@/features/shared/ui/formbuilder";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useRoleStore } from "@/store/useRoleStore";
import type { UserFormData } from "../core/types";
import { useUsersStore } from "../core/store";
import { useCreateUser, useUpdateUser } from "../core/api";
import { getUsersFormConfig } from "../configs/form.config";


const useUsersForm = () => {
  const isOpen = useUsersStore((state) => state.isFormOpen);
  const formMode = useUsersStore((state) => state.formMode);
  const formInitialValues = useUsersStore((state) => state.formInitialValues);
  const closeForm = useUsersStore((state) => state.closeForm);

  const { isSidebarOpen, closeSidebar } = useLayoutStore();

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (isOpen && isSidebarOpen) {
      closeSidebar();
    }
  }, [isOpen, isSidebarOpen, closeSidebar]);

  const handleSubmit = useCallback(
    async (data: UserFormData): Promise<void> => {
      if (formMode === "create") {
        await createUser.mutateAsync({
          email: data.email || "",
          fullName: data.fullName || "",
          password: data.password || "",
          phoneNumber: data.mobile || "",
        });
        closeForm();
      } else if (formMode === "edit") {
        if (!formInitialValues) return;

        await updateUser.mutateAsync({
          id: Number(formInitialValues.id),
          payload: {
            data: {
              email: data.email,
              fullName: data.fullName,
              phoneNumber: data.mobile,
            },
            password: data.password || undefined,
            roleId: data.role ? Number(data.role) : undefined,
          },
        });
        closeForm();
      }
    },
    [formMode, createUser, updateUser, closeForm, formInitialValues],
  );

  const handleClose = useCallback((): void => {
    closeForm();
  }, [closeForm]);

  return {
    isOpen,
    initialValues: formInitialValues as UserFormData | undefined,
    isPending: createUser.isPending || updateUser.isPending,
    onSubmit: handleSubmit,
    onClose: handleClose,
  };
};



export function UsersForm() {
  const { roles } = useRoleStore();
  const formState = useUsersForm();

  const config = getUsersFormConfig(roles);

  return (
    <FormBuilder<UserFormData>
      config={config}
      initialValues={formState.initialValues}
      isLoading={formState.isPending}
      isOpen={formState.isOpen}
      onClose={formState.onClose}
      onSubmit={formState.onSubmit}
    />
  );
}
