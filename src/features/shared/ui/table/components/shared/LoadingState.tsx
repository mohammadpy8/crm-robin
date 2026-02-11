"use client";

import { Skeleton } from "@heroui/react";

interface LoadingStateProps {
	columnWidths: number[];
	itemsPerPage: number;
}

export const LoadingState = ({ columnWidths, itemsPerPage }: LoadingStateProps) => {
	return (
		<div
			className="custom-scrollbar flex-1 overflow-auto"
			style={{
				scrollbarGutter: "stable",
			}}
		>
			<div className="pr-3">
				<div className="flex flex-col gap-1" style={{ minWidth: "max-content" }}>
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
			</div>

			<style jsx={true}>{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 8px;
					height: 8px;
				}

				.custom-scrollbar::-webkit-scrollbar-track {
					background: transparent;
					border-radius: 8px;
				}

				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: rgba(0, 0, 0, 0.2);
					border-radius: 8px;
					border: 2px solid transparent;
					background-clip: padding-box;
				}

				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background: rgba(0, 0, 0, 0.3);
					border: 2px solid transparent;
					background-clip: padding-box;
				}

				.custom-scrollbar::-webkit-scrollbar-corner {
					background: transparent;
				}

				.custom-scrollbar {
					scrollbar-width: thin;
					scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
				}
			`}</style>
		</div>
	);
};