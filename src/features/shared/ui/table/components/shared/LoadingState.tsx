// features/shared/ui/table/components/shared/LoadingState.tsx
"use client";

import { Skeleton } from "@heroui/react";

interface LoadingStateProps {
	columnWidths: number[];
	itemsPerPage: number;
}

export const LoadingState = ({ columnWidths, itemsPerPage }: LoadingStateProps) => {
	return (
		<div className="flex flex-col gap-1">
			{Array.from({ length: itemsPerPage }).map((_, rowIndex) => (
				<div
					className="shrink-0 rounded-lg bg-white p-3"
					key={`skeleton-row-${rowIndex}`}
				>
					<div className="flex items-center gap-2">
						{columnWidths.map((width, colIndex) => (
							<div
								className="shrink-0"
								key={`skeleton-col-${rowIndex}-${colIndex}`}
								style={{ width: `${width}px` }}
							>
								{colIndex === 0 ? (
									<div className="flex items-center gap-2 pr-1.5">
										<Skeleton className="h-4 w-4 rounded" />
										<div className="flex items-center gap-2">
											<Skeleton className="h-5 w-5 rounded" />
											<Skeleton className="h-5 w-5 rounded" />
										</div>
									</div>
								) : (
									<Skeleton className="h-4 w-full rounded" />
								)}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};
