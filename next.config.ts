import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	devIndicators: {
		position: "bottom-right",
	},
	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
	images: {
		qualities: [1, 100],
		remotePatterns: [
			
		],
	},
	output: "standalone",
	pageExtensions: ["ts", "tsx", "js", "jsx"],
	productionBrowserSourceMaps: false,
	reactStrictMode: true,
	turbopack: {
		root: "../../",
	},
	// typedRoutes: true,
};

export default nextConfig;
