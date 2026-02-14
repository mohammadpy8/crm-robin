import { Menu, Plus } from "lucide-react";
import { Contact, Delete, Send } from "@/icons";
import Update from "@/icons/path/Update";
import type { ToolbarConfig } from "@/features/shared/ui/toolbar";

export const contactsToolbarConfig: ToolbarConfig = {
  pageTitle: {
    icon: <Contact className='h-7 w-7 fill-primary text-transparent' />,
    title: "مخاطبین",
  },

  createButton: {
    label: "ایجاد مخاطب",
    icon: <Plus className='h-4 w-4' />,
  },

  filterButton: {
    icon: <Menu className='h-4 w-4' />,
    defaultLabel: "همه مخاطبین",
    options: [{ label: "همه مخاطبین", value: "all" }],
  },

  actionButtons: [
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
  },

  showSelectionCount: true,
};
