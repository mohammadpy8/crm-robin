import { useContext } from "react";
import { ToolbarContext } from "@/features/shared/ui/toolbar/providers/ToolbarProvider";

export const useToolbarContext = () => {
	const context = useContext(ToolbarContext);
	if (!context) {
		throw new Error("useToolbarContext must be used within ToolbarProvider");
	}
	return context;
};
