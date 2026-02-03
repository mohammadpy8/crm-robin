"use client";

import { Menu } from "lucide-react";
import Toolbar from "@/features/shared/ui/toolbar/Toolbar";
import { Delete, Organization, Send } from "@/icons";
import Update from "@/icons/path/Update";

const ContactsPage = () => {
	const toolbarConfig = {
		actionButtons: [
			{
				icon: <Update className="h-4 w-4" />,
				id: "update",
				label: "آپدیت کلی",
				onClick: () => console.log("Update"),
				variant: "ghost" as const,
			},
			{
				icon: <Send className="h-4 w-4" />,
				id: "assign",
				label: "ارجاع به",
				onClick: () => console.log("Assign"),
				variant: "ghost" as const,
			},
			{
				icon: <Delete className="h-4 w-4" />,
				id: "delete",
				label: "حذف",
				onClick: () => console.log("Delete"),
				variant: "danger" as const,
			},
		],
		createButton: {
			label: "ایجاد مخاطب",
			onClick: () => console.log("Create contact"),
		},
		filterButton: {
			defaultLabel: "همه مخاطبین",
			onFilterChange: () => console.log("Filter changed:"),
			options: [
				{ label: "همه مخاطبین", value: "all" },
				{ label: "مخاطبین فعال", value: "active" },
				{ label: "مخاطبین غیرفعال", value: "inactive" },
			],
		},
		moreButton: {
			onClick: () => console.log("More clicked"),
		},
		pageTitle: {
			icon: <Organization className="h-7 w-7" />,
			title: "مخاطبین",
		},
		viewButtons: [
			{
				active: true,
				icon: <Menu className="h-4 w-4" />,
				id: "list",
				label: "نمایش لیست",
				onClick: () => console.log("List view"),
			},
			{
				active: false,
				icon: <Menu className="h-4 w-4" />,
				id: "kanban",
				label: "نمایش کاریز",
				onClick: () => console.log("Kanban view"),
			},
		],
	};

	return (
		<div>
			<Toolbar config={toolbarConfig} />
		</div>
	);
};

export default ContactsPage;
