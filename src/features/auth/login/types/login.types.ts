import type { z } from "zod";
import type { loginSchema } from "../schemas/login.schema";

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginResponse {
	token: string;
	user: {
		id: string;
		name: string;
	};
}
