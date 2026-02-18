"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { authService } from "@/api/services";
import { loginSchema } from "@/features/auth/login/schemas/login.schema";
import type { LoginFormData } from "@/features/auth/login/types/login.types";
import { useAuth } from "@/hooks";
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
    callbackUrl,
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
      password: data.password,
      phoneNumber: data.phone,
    });
  };

  return (
    <div className='flex w-full flex-col justify-center md:w-1/2 md:p-12'>
      <div className='mx-auto w-full max-w-md'>
        <h1 className='mb-5 font-bold text-primary text-xl'>خوش آمدید</h1>

        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <InputField
            disabled={isLoading}
            error={errors.phone?.message}
            id='phone'
            placeholder='شماره تلفن'
            type='text'
            {...register("phone")}
          />

          <InputField
            disabled={isLoading}
            error={errors.password?.message}
            id='password'
            placeholder='رمز عبور'
            type='password'
            {...register("password")}
          />

          <button
            className='w-full rounded-lg border-1 border-black bg-primary py-3 font-medium text-white transition duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            disabled={isLoading}
            type='submit'
          >
            {isLoading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}
