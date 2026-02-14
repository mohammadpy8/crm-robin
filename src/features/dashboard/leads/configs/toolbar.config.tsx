import { Kanban, Menu, Plus } from "lucide-react";
import { Apps, Delete, Dollar, Send } from "@/icons";
import Update from "@/icons/path/Update";
import type { ToolbarConfig } from "@/features/shared/ui/toolbar";

export const leadsToolbarConfig: ToolbarConfig = {
  pageTitle: {
    icon: <Dollar className='h-7 w-7 fill-primary text-transparent' />,
    title: "سرنخ های فروش",
  },

  createButton: {
    label: "ایجاد سرنخ",
    icon: <Plus className='h-4 w-4' />,
  },

  filterButton: {
    icon: <Menu className='h-4 w-4' />,
    defaultLabel: "همه سرنخ ها",
    options: [
      { label: "همه سرنخ ها", value: "all" },
      //   { label: "سرنخ های جدید", value: "new" },
      //   { label: "تماس گرفته شده", value: "contacted" },
      //   { label: "واجد شرایط", value: "qualified" },
      //   { label: "تبدیل شده", value: "converted" },
      //   { label: "موفق", value: "won" },
      //   { label: "از دست رفته", value: "lost" },
    ],
  },

  viewButtons: [
    {
      id: "list",
      label: "نمایش لیست",
      icon: <Menu className='h-4 w-4' />,
      href: "/dashboard/leads",
      active: true,
    },
    {
      id: "kanban",
      label: "نمایش کاریز",
      icon: <Kanban className='h-4 w-4' />,
      href: "/dashboard/leads/kanban",
      active: false,
      disabled: true,
    },
  ],

  actionButtons: [
    {
      id: "change-status",
      label: "تغییر وضعیت",
      icon: <Apps className='h-4 w-4' />,
      variant: "ghost" as const,
      hasPopover: true,
      popoverOptions: [
        { label: "جدید", value: "new" },
        { label: "تماس گرفته شده", value: "contacted" },
        { label: "واجد شرایط", value: "qualified" },
        { label: "تبدیل شده", value: "converted" },
        { label: "موفق", value: "won" },
        { label: "از دست رفته", value: "lost" },
      ],
      //   onPopoverConfirm: () => {
      //     console.log("تغییر وضعیت");
      //   },
      visibility: "any" as const,
    },
    {
      id: "assign",
      label: "ارجاع به",
      icon: <Send className='h-4 w-4 fill-secondary text-transparent' />,
      variant: "ghost" as const,
      visibility: "any" as const,
    },
    {
      id: "bulk-update",
      label: "آپدیت کلی",
      icon: <Update className='h-4 w-4 fill-secondary text-transparent' />,
      variant: "ghost" as const,
      visibility: "any" as const,
      className:
        "focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
    },
    {
      id: "delete",
      label: "حذف",
      icon: <Delete className='h-4 w-4 fill-white text-transparent' />,
      variant: "danger" as const,
      visibility: "any" as const,
      className:
        "!bg-red-600 !text-white hover:!bg-red-700 focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
    },
  ],

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

  showSelectionCount: true,
};
