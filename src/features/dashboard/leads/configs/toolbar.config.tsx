import { Kanban, Menu, Plus } from "lucide-react";
import type { ToolbarConfig } from "@/features/shared/ui/toolbar";
import { Delete, Dollar, Layers, Send } from "@/icons";
import Update from "@/icons/path/Update";
import type { UserOption } from "@/store/useUserStore.";

export const getLeadsToolbarConfig = (users: UserOption[]): ToolbarConfig => ({
  actionButtons: [
    {
      hasPopover: true,
      icon: <Layers className='h-4 w-4 fill-secondary text-transparent' />,
      id: "change-status",
      label: "تغییر وضعیت",
      popoverOptions: [
        { label: "جدید", value: "new" },
        { label: "تماس گرفته شده", value: "contacted" },
        { label: "واجد شرایط", value: "qualified" },
        { label: "تبدیل شده", value: "converted" },
        { label: "موفق", value: "won" },
        { label: "از دست رفته", value: "lost" },
      ],
      selectionMode: "single",
      variant: "ghost" as const,
      visibility: "any" as const,
    },
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
    label: "ایجاد سرنخ",
  },

  filterButton: {
    defaultLabel: "همه سرنخ ها",
    icon: <Menu className='h-4 w-4' />,
    options: [{ label: "همه سرنخ ها", value: "all" }],
  },

  moreButton: {
    label: "بیشتر",
    options: [],
  },

  pageTitle: {
    icon: <Dollar className='h-7 w-7 fill-primary text-transparent' />,
    title: "سرنخ های فروش",
  },

  showSelectionCount: true,

  viewButtons: [
    {
      active: true,
      href: "/leads/list",
      icon: <Menu className='h-4 w-4' />,
      id: "list",
      label: "نمایش لیست",
    },
    {
      active: false,
      disabled: true,
      href: "/leads/kanban",
      icon: <Kanban className='h-4 w-4' />,
      id: "kanban",
      label: "نمایش کاریز",
    },
  ],
});
