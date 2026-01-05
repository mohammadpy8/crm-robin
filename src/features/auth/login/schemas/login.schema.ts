import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "شماره تلفن الزامی است")
		.regex(/^09[0-9]{9}$/, "فرمت شماره تلفن صحیح نیست"),
	password: z
		.string()
		.min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
		.max(50, "رمز عبور نباید بیشتر از 50 کاراکتر باشد"),
});
