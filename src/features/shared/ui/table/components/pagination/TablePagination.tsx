"use client";

import { Pagination } from "@heroui/react";

interface TablePaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const TablePagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: TablePaginationProps) => {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="shrink-0 pt-3">
			<div className="flex items-center justify-center">
				<Pagination
					classNames={{
						cursor: "bg-secondary text-white font-semibold shadow-sm min-w-[28px] h-7",
						item: "text-xs font-medium text-gray-700 hover:bg-gray-200 min-w-[28px] h-7",
						next: "bg-gray-100 hover:bg-gray-200 rounded-lg min-w-[28px] h-7",
						prev: "bg-gray-100 hover:bg-gray-200 rounded-lg min-w-[28px] h-7",
						wrapper: "gap-1",
					}}
					dir="ltr"
					onChange={onPageChange}
					page={currentPage}
					showControls={true}
					total={totalPages}
				/>
			</div>
		</div>
	);
};
