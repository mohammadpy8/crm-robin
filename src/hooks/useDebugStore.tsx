'use client'

import { useEffect } from "react";

export const useDebugStore = (storeName: string, store: any) => {
	useEffect(() => {
		const unsubscribe = store.subscribe((state: any) => {
			console.log(`🔍 [${storeName}] State Changed:`, state);
		});

		return () => unsubscribe();
	}, [storeName, store]);
};
