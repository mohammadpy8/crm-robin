"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/features/auth/login/schemas/login.schema";
import type { LoginFormData } from "@/features/auth/login/types/login.types";
import { InputField } from "./InputField";

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		mode: "onBlur",
		resolver: zodResolver(loginSchema),
		reValidateMode: "onChange",
	});

	const onSubmit = (data: LoginFormData) => {
		console.log(data);
	};

	return (
		<div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
			<div className="mx-auto w-full max-w-md">
				<h1 className="mb-5 font-bold text-primary text-xl">خوش آمدید</h1>

				<form className="" onSubmit={handleSubmit(onSubmit)}>
					<InputField
						error={errors.email?.message}
						id="email"
						placeholder="شماره تلفن"
						type="text"
						{...register("email")}
					/>

					<InputField
						error={errors.password?.message}
						id="password"
						placeholder="رمز عبور"
						type="password"
						{...register("password")}
					/>

					<button
						className="w-full rounded-lg border-1 border-black bg-primary py-3 font-medium text-white transition duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						type="submit"
					>
						ورود
					</button>
				</form>
			</div>
		</div>
	);
}
