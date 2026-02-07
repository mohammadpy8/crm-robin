"use client";

import { createContext, type ReactNode, useState } from "react";
import type { ToolbarContextValue } from "@/features/shared/ui/toolbar/types/toolbar.types";

export const ToolbarContext = createContext<ToolbarContextValue | undefined>(undefined);

interface ToolbarProviderProps {
	children: ReactNode;
	defaultFilter: string;
}

export const ToolbarProvider: React.FC<ToolbarProviderProps> = ({
	children,
	defaultFilter,
}) => {
	const [selectedCount, setSelectedCount] = useState(0);
	const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

	return (
		<ToolbarContext.Provider
			value={{
				selectedCount,
				selectedFilter,
				setSelectedCount,
				setSelectedFilter,
			}}
		>
			{children}
		</ToolbarContext.Provider>
	);
};
