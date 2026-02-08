"use client";

import { useEffect, type RefObject } from "react";

export const useSyncScroll = (
	headerRef: RefObject<HTMLDivElement>,
	bodyRef: RefObject<HTMLDivElement>,
) => {
	useEffect(() => {
		const bodyScroll = bodyRef.current;
		const headerScroll = headerRef.current;

		if (!bodyScroll || !headerScroll) {
			return;
		}

		const handleBodyScroll = (): void => {
			headerScroll.scrollLeft = bodyScroll.scrollLeft;
		};

		bodyScroll.addEventListener("scroll", handleBodyScroll, { passive: true });

		return () => {
			bodyScroll.removeEventListener("scroll", handleBodyScroll);
		};
	}, [headerRef, bodyRef]);
};
