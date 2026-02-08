"use client";

import { Spinner } from "@heroui/react";

export const LoadingState = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center rounded-2xl bg-primary p-3">
			<Spinner color="warning" size="lg" />
		</div>
	);
};
