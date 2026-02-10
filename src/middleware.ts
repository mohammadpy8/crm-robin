/** biome-ignore-all assist/source/organizeImports: <> */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = [
	"/users", 
	"/contacts", 
	"/accounts", 
	"/leads"
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	
	const accessToken = request.cookies.get("access_token")?.value;
	const isAuthenticated = !!accessToken;

	const isPublicRoute = pathname === "/login";
	const isProtectedRoute = PROTECTED_ROUTES.some(route => 
		pathname.startsWith(route)
	);

	if (!isAuthenticated && isProtectedRoute) {
		const url = new URL("/login", request.url);
		url.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(url);
	}

	if (isAuthenticated && isPublicRoute) {
		return NextResponse.redirect(new URL("/users/list", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/login",
		"/(users|contacts|accounts|leads)/:path*",
	],
};
