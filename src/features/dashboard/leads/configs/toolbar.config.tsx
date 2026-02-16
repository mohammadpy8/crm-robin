import { Kanban, Menu, Plus } from "lucide-react";
import type { ToolbarConfig } from "@/features/shared/ui/toolbar";
import { Apps, Delete, Dollar, Send } from "@/icons";
import Update from "@/icons/path/Update";

export const leadsToolbarConfig: ToolbarConfig = {
  actionButtons: [
    {
      hasPopover: true,
      icon: <Apps className='h-4 w-4' />,
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
      variant: "ghost" as const,
      visibility: "any" as const,
    },
    {
      icon: <Send className='h-4 w-4 fill-secondary text-transparent' />,
      id: "assign",
      label: "ارجاع به",
      variant: "ghost" as const,
      visibility: "any" as const,
    },
    {
      className:
        "focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
      icon: <Update className='h-4 w-4 fill-secondary text-transparent' />,
      id: "bulk-update",
      label: "آپدیت کلی",
      variant: "ghost" as const,
      visibility: "any" as const,
    },
    {
      className:
        "!bg-red-600 !text-white hover:!bg-red-700 focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
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
    // options: [
    //   {
    //     label: "خروجی Excel",
    //     value: "export-excel",
    //   },
    //   {
    //     label: "ایمپورت سرنخ ها",
    //     value: "import-leads",
    //   },
    //   {
    //     label: "گزارش سرنخ ها",
    //     value: "leads-report",
    //   },
    // ],
  },
  pageTitle: {
    icon: <Dollar className='h-7 w-7 fill-primary text-transparent' />,
    title: "سرنخ های فروش",
  },

  showSelectionCount: true,

  viewButtons: [
    {
      active: true,
      href: "/users/list",
      icon: <Menu className='h-4 w-4' />,
      id: "list",
      label: "نمایش لیست",
    },
    {
      active: false,
      disabled: true,
      href: "/users/kanban",
      icon: <Kanban className='h-4 w-4' />,
      id: "kanban",
      label: "نمایش کاریز",
    },
  ],
};
