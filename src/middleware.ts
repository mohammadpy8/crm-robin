import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login"];
const AUTH_ROUTES = ["/login"];
const DEFAULT_REDIRECT = "/users/list";
const LOGIN_PATH = "/login";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const accessToken = request.cookies.get("accessToken")?.value;
	const isAuthenticated = !!accessToken;

	if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
		return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url));
	}

	if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
		const url = new URL(LOGIN_PATH, request.url);
		url.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/login",
		"/users/:path*",
		"/contacts/:path*",
		"/leads/:path*",
		"/accounts/:path*",
	],
};
