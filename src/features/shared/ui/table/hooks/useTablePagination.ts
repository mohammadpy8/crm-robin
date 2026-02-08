"use client";

import { useCallback, useMemo, useState } from "react";

interface UseTablePaginationProps {
	itemsPerPage?: number;
	totalItems?: number;
	dataLength: number;
	externalCurrentPage?: number;
	onPageChange?: (page: number) => void;
}

export const useTablePagination = ({
	itemsPerPage = 8,
	totalItems,
	dataLength,
	externalCurrentPage,
	onPageChange,
}: UseTablePaginationProps) => {
	const [internalCurrentPage, setInternalCurrentPage] = useState(1);

	const currentPage = externalCurrentPage ?? internalCurrentPage;

	const totalPages = useMemo(() => {
		return totalItems
			? Math.ceil(totalItems / itemsPerPage)
			: Math.ceil(dataLength / itemsPerPage);
	}, [totalItems, dataLength, itemsPerPage]);

	const handlePageChange = useCallback(
		(page: number) => {
			if (onPageChange) {
				onPageChange(page);
			} else {
				setInternalCurrentPage(page);
			}
		},
		[onPageChange],
	);

	return {
		currentPage,
		handlePageChange,
		setInternalCurrentPage,
		totalPages,
	};
};
