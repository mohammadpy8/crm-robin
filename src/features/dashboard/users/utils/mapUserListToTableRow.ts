import type { UserListItem } from "@/api/types";
import type { TableRow } from "@/features/shared/ui/table";

export const mapUserListToTableRows = (users: UserListItem[]): TableRow[] => {
	return users.map((user) => ({
		email: "",
		fullName: user.fullName,
		id: user.id,
		phone: "",
		role: "",
	}));
};
