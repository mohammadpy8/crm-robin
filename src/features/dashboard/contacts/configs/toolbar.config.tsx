import { Kanban, Menu, Plus } from "lucide-react";
import type { ToolbarConfig } from "@/features/shared/ui/toolbar";
import { Contact, Delete, Send } from "@/icons";
import Update from "@/icons/path/Update";
import type { UserOption } from "@/store/useUserStore.";

export const getContactsToolbarConfig = (users: UserOption[]): ToolbarConfig => ({
  actionButtons: [
    {
      hasPopover: true,
      icon: <Send className='h-4 w-4 fill-secondary text-transparent' />,
      id: "assign",
      label: "ارجاع به",
      popoverMaxHeight: 200,
      popoverOptions: users,
      selectionMode: "single",
      variant: "ghost" as const,
      visibility: "any" as const,
    },
    {
      icon: <Update className='h-4 w-4 fill-secondary text-transparent' />,
      id: "bulk-update",
      label: "آپدیت کلی",
      variant: "ghost" as const,
      visibility: "any" as const,
    },
    {
      className: "!bg-red-600 !text-white hover:!bg-red-700",
      icon: <Delete className='h-4 w-4 fill-white text-transparent' />,
      id: "delete",
      label: "حذف",
      variant: "danger" as const,
      visibility: "any" as const,
    },
  ],

  createButton: {
	dropdownOptions: [
      {
        label: "ایمپورت از Excel",
        value: "import-excel",
      },
    ],
    icon: <Plus className='h-4 w-4' />,
    label: "ایجاد مخاطب",
  },

  filterButton: {
    defaultLabel: "همه مخاطبین",
    icon: <Menu className='h-4 w-4' />,
    options: [{ label: "همه مخاطبین", value: "all" }],
  },

  moreButton: {
    label: "بیشتر",
    options: [],
  },

  pageTitle: {
    icon: <Contact className='h-7 w-7 fill-primary text-transparent' />,
    title: "مخاطبین",
  },

  showSelectionCount: true,

  viewButtons: [
    {
      active: true,
      href: "/contacts/list",
      icon: <Menu className='h-4 w-4' />,
      id: "list",
      label: "نمایش لیست",
    },
    {
      active: false,
      disabled: true,
      href: "/contacts/kanban",
      icon: <Kanban className='h-4 w-4' />,
      id: "kanban",
      label: "نمایش کاریز",
    },
  ],
});
