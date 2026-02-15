const buildQueryString = <T,>(params?: T): string => {
	if (!params) {return "";}
	
	const searchParams = new URLSearchParams();
	
	Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			searchParams.append(key, String(value));
		}
	});
	
	const queryString = searchParams.toString();
	return queryString ? `?${queryString}` : "";
};

export default buildQueryString;
