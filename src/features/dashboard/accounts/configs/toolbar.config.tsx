import { Kanban, Menu, Plus } from "lucide-react";
import type { ToolbarConfig } from "@/features/shared/ui/toolbar";
import { Delete, Organization, Send } from "@/icons";
import Update from "@/icons/path/Update";
import type { UserOption } from "@/store/useUserStore.";

export const getAccountsToolbarConfig = (users: UserOption[]): ToolbarConfig => ({
  actionButtons: [
    {
      icon: <Update className='h-4 w-4 fill-secondary text-transparent' />,
      id: "change-level",
      label: "تغییر سطح",
      variant: "ghost" as const,
      visibility: "any" as const,
      hasPopover: true,
      selectionMode: "single",
      popoverOptions: [
        { label: "برنز", value: "bronze" },
        { label: "نقره", value: "silver" },
        { label: "طلا", value: "gold" },
      ],
    },
    {
      icon: <Update className='h-4 w-4 fill-secondary text-transparent' />,
      id: "change-status",
      label: "تغییر وضعیت",
      variant: "ghost" as const,
      visibility: "any" as const,
      hasPopover: true,
      popoverOptions: [
        { label: "فعال", value: "active" },
        { label: "غیرفعال", value: "passive" },
        { label: "تعلیق", value: "suspension" },
      ],
    },
    {
      icon: <Send className='h-4 w-4 fill-secondary text-transparent' />,
      id: "assign",
      label: "ارجاع به",
      variant: "ghost" as const,
      visibility: "any" as const,
      popoverMaxHeight: 200,
      hasPopover: true,
      selectionMode: "single",
      popoverOptions: users,
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
    icon: <Plus className='h-4 w-4' />,
    label: "ایجاد سازمان",
    dropdownOptions: [
      {
        label: "ایمپورت از Excel",
        value: "import-excel",
      },
    ],
  },

  filterButton: {
    defaultLabel: "همه سازمان‌ها",
    icon: <Menu className='h-4 w-4' />,
    options: [{ label: "همه سازمان‌ها", value: "all" }],
  },

  moreButton: {
    label: "بیشتر",
    options: [],
  },

  pageTitle: {
    icon: <Organization className='h-7 w-7 fill-primary text-transparent' />,
    title: "سازمان‌ها",
  },

  showSelectionCount: false,

  viewButtons: [
    {
      active: true,
      href: "/accounts/list",
      icon: <Menu className='h-4 w-4' />,
      id: "list",
      label: "نمایش لیست",
    },
    {
      active: false,
      disabled: true,
      href: "/accounts/kanban",
      icon: <Kanban className='h-4 w-4' />,
      id: "kanban",
      label: "نمایش کاریز",
    },
  ],
});
