"use client";

import { useCallback, useRef } from "react";
import type { FilterState, FilterValue } from "../types";

export const useTableFilters = () => {
	const filterInputsRef = useRef<FilterState>({});

	const setFilter = useCallback((columnId: string, value: FilterValue) => {
		filterInputsRef.current = {
			...filterInputsRef.current,
			[columnId]: value,
		};
	}, []);

	const getFilter = useCallback((columnId: string): FilterValue => {
		return filterInputsRef.current[columnId];
	}, []);

	const clearFilters = useCallback(() => {
		filterInputsRef.current = {};
	}, []);

	const getAllFilters = useCallback((): FilterState => {
		return { ...filterInputsRef.current };
	}, []);

	return { clearFilters, getAllFilters, getFilter, setFilter };
};