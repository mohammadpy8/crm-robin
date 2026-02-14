import { Kanban, Menu, Plus, Users } from "lucide-react";
import { Delete, Dots } from "@/icons";
import Update from "@/icons/path/Update";

export const usersToolbarConfig = {
  pageTitle: {
    icon: <Users className='h-7 w-7 text-primary' />,
    title: "کاربران",
  },

  createButton: {
    className:
      "focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
    icon: <Plus className='h-4 w-4' />,
    label: "ایجاد کاربر",
  },

  filterButton: {
    defaultLabel: "همه کاربران",
    icon: <Menu className='h-4 w-4' />,
    options: [
      { label: "همه کاربران", value: "all" },
      // { label: "کاربران فعال", value: "active" },
      // { label: "کاربران غیرفعال", value: "inactive" },
      // { label: "مدیران", value: "admins" },
      // { label: "کاربران عادی", value: "users" },
    ],
  },

  actionButtons: [
    {
      className:
        "focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
      icon: <Update className='h-4 w-4 fill-secondary text-transparent' />,
      id: "bulk-update",
      label: "بروزرسانی کلی",
      variant: "ghost" as const,
      visibility: "any" as const,
    },
    {
      className:
        "bg-secondary/90 text-white items-center hover:bg-secondary focus:outline-none focus:ring-0 active:scale-95 active:shadow-inner transition-all duration-150 ease-in-out",
      disableOnMultiple: true,
      icon: <Dots className='h-4 w-4 fill-white text-transparent' />,
      id: "reset-password",
      label: "بروزرسانی رمز ورود",
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

  moreButton: {
    label: "بیشتر",
    options: [
      {
        label: "خروجی Excel",
        value: "export-excel",
      },
      // { label: "خروجی PDF", value: "export-pdf" },
      // { label: "ایمپورت کاربران", value: "import-users" },
      // { label: "گزارش کاربران", value: "users-report" },
    ],
  },

  showSelectionCount: true,
};
