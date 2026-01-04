/** biome-ignore-all lint/correctness/noUnusedImports: <use next auth types and override type > */
import NextAuth from "next-auth";

declare module "next-auth" {
	interface User {
		data: {
			access_token?: string;
			refresh_token?: string;
		};
	}

	interface Session {
		user: {
			access_token: string;
			refresh_token: string;
		};
	}
}
