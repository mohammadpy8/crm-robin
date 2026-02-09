/** biome-ignore-all assist/source/useSortedAttributes: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all assist/source/useSortedKeys: <> */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { loginSchema } from "@/features/auth/login/schemas/login.schema";
import type { LoginFormData } from "@/features/auth/login/types/login.types";
import { useAuth } from "@/hooks";
import { authService } from "@/api/services";
import { InputField } from "./InputField";

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/users/list";

	useEffect(() => {
		if (authService.isAuthenticated()) {
			router.replace(callbackUrl);
		}
	}, [router, callbackUrl]);

	const { login, isLoading } = useAuth({
		onLoginSuccess: () => {
			router.push(callbackUrl);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		mode: "onBlur",
		resolver: zodResolver(loginSchema),
		reValidateMode: "onChange",
	});

	const onSubmit = async (data: LoginFormData) => {
		await login({
			phoneNumber: data.phone,
			password: data.password,
		});
	};

	return (
		<div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
			<div className="mx-auto w-full max-w-md">
				<h1 className="mb-5 font-bold text-primary text-xl">خوش آمدید</h1>

				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<InputField
						error={errors.phone?.message}
						id="phone"
						placeholder="شماره تلفن"
						type="text"
						disabled={isLoading}
						{...register("phone")}
					/>

					<InputField
						error={errors.password?.message}
						id="password"
						placeholder="رمز عبور"
						type="password"
						disabled={isLoading}
						{...register("password")}
					/>

					<button
						className="w-full rounded-lg border-1 border-black bg-primary py-3 font-medium text-white transition duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "در حال ورود..." : "ورود"}
					</button>
				</form>
			</div>
		</div>
	);
}
