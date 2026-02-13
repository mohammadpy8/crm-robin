import { authService } from "@/api/services";
import type { UserListItem } from "@/api/types";
import type { TableRow } from "@/features/shared/ui/table";

export const transformUsersToTableRows = (users: UserListItem[]): TableRow[] =>
	users.map((user) => ({
		createdAt: "",
		email: "",
		fullName: user.fullName || "",
		id: user.id,
		phone: "",
		role: "",
	}));

export const fetchUsers = async (): Promise<TableRow[]> => {
	const response = await authService.getUserList();
	return transformUsersToTableRows(response);
};
