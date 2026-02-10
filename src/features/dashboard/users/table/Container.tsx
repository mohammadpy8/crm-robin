import { useState } from "react";
import { TableBuilder } from "@/features/shared/ui/table";
import { columnConfig } from "./config";
import { useTableHandlers } from "./handler";

export default function UsersTableContainer() {
	const [TableData] = useState([]);

	const {
		handleEdit,
		handleFilterChange,
		handleSelectionChange,
		handleSortChange,
		handleView,
	} = useTableHandlers();

	return (
		<TableBuilder
			columns={columnConfig}
			data={TableData}
			itemsPerPage={10}
			multiSelect={false}
			onFilterChange={handleFilterChange}
			onRowEdit={handleEdit}
			onRowView={handleView}
			onSelectionChange={handleSelectionChange}
			onSortChange={handleSortChange}
		/>
	);
}
