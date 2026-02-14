import { Menu, Plus } from "lucide-react";
import { Delete, Organization, Send } from "@/icons";
import Update from "@/icons/path/Update";
import type { ToolbarConfig } from "@/features/shared/ui/toolbar";

export const accountsToolbarConfig: ToolbarConfig = {
  pageTitle: {
    icon: <Organization className='h-7 w-7 fill-primary text-transparent' />,
    title: "سازمان‌ها",
  },

  createButton: {
    label: "ایجاد سازمان",
    icon: <Plus className='h-4 w-4' />,
  },

  filterButton: {
    icon: <Menu className='h-4 w-4' />,
    defaultLabel: "همه سازمان‌ها",
    options: [{ label: "همه سازمان‌ها", value: "all" }],
  },

  actionButtons: [
    {
      id: "change-level",
      label: "تغییر سطح",
      icon: <Update className='h-4 w-4 fill-secondary text-transparent' />,
      variant: "ghost" as const,
      visibility: "any" as const,
    },
    {
      id: "change-status",
      label: "تغییر وضعیت",
      icon: <Update className='h-4 w-4 fill-secondary text-transparent' />,
      variant: "ghost" as const,
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
    },
    {
      id: "delete",
      label: "حذف",
      icon: <Delete className='h-4 w-4 fill-white text-transparent' />,
      variant: "danger" as const,
      visibility: "any" as const,
      className: "!bg-red-600 !text-white hover:!bg-red-700",
    },
  ],

  moreButton: {
    label: "بیشتر",
  },

  showSelectionCount: true,
};
