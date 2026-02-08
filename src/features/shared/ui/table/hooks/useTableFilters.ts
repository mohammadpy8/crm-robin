"use client";

import { useCallback, useRef, useState } from "react";
import type { FilterValue, FilterState } from "../types";

export const useTableFilters = () => {
	const filterInputsRef = useRef<FilterState>({});
	const [, forceUpdate] = useState({});

	const setFilter = useCallback((columnId: string, value: FilterValue) => {
		filterInputsRef.current[columnId] = value;
		forceUpdate({});
	}, []);

	const getFilter = useCallback((columnId: string): FilterValue => {
		return filterInputsRef.current[columnId];
	}, []);

	const clearFilters = useCallback(() => {
		filterInputsRef.current = {};
		forceUpdate({});
	}, []);

	const getAllFilters = useCallback((): FilterState => {
		return filterInputsRef.current;
	}, []);

	return { setFilter, getFilter, clearFilters, getAllFilters };
};
