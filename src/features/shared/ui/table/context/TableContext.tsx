"use client";

import React, {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import type { FilterState, FilterValue } from "../types";

interface TableContextValue {
	filters: FilterState;
	setFilter: (columnId: string, value: FilterValue) => void;
	clearFilters: () => void;
	rowSelection: Record<string, boolean>;
	setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

interface TableProviderProps {
	children: ReactNode;
}

export const TableProvider = ({ children }: TableProviderProps) => {
	const [filters, setFilters] = useState<FilterState>({});
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
	const [currentPage, setCurrentPage] = useState(1);

	const setFilter = useCallback((columnId: string, value: FilterValue) => {
		setFilters((prev) => ({
			...prev,
			[columnId]: value,
		}));
	}, []);

	const clearFilters = useCallback(() => {
		setFilters({});
	}, []);

	return (
		<TableContext.Provider
			value={{
				clearFilters,
				currentPage,
				filters,
				rowSelection,
				setCurrentPage,
				setFilter,
				setRowSelection,
			}}
		>
			{children}
		</TableContext.Provider>
	);
};

export const useTableContext = () => {
	const context = useContext(TableContext);
	if (!context) {
		throw new Error("useTableContext must be used within TableProvider");
	}
	return context;
};
