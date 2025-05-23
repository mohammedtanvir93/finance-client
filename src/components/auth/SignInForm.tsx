"use client";
// import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMsg from "../form/error-msg";
import { useLogin } from "@/hooks/mutation/auth/useLogin";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { retrieve, store } from "@/utils/session";
import Alert from "../ui/alert/Alert";

const schema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Email is required' })
      .email(),
    password: z
      .string()
      .min(1, { message: 'Password is required' }),
  });

type FormFields = z.infer<typeof schema>;

export default function SignInForm() {
  const router = useRouter();

  const toastId = useRef<string | number | null>(null);

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
      errors,
    },
    setError,
    clearErrors
  } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const {
    mutate: login
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = retrieve("token");
    if (token) {
      router.replace("/users");
    }
  }, [router]);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    clearErrors();
    toastId.current = toast.loading('Credentials processing...');

    login(data, {
      onSuccess: (result) => {
        store('token', result.access_token);
        toast.success('Logged in successfully');
        router.push('/users');
      },
      onError: (error) => {
        const errorDetails = error.message ? JSON.parse(error.message) : null;

        if (errorDetails.detail) {
          setError(
            'root',
            {
              type: 'manual', message: errorDetails.detail
            }
          );
        }

        console.error('Failed to login');
      },
      onSettled: () => {
        if (toastId.current) {
          toast.dismiss(toastId.current);
          toastId.current = null;
        }
      }
    });
  };
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div className="mb-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="info@gmail.com"
                    type="email"
                    error={errors.username !== undefined}
                    {...register('username')}
                  />
                  <ErrorMsg message={errors.username?.message} />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      error={errors.password !== undefined}
                      {...register('password')}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                  <ErrorMsg message={errors.password?.message} />
                </div>
                <div>
                  <Button disabled={isSubmitting} type="submit" className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
          {
            errors.root &&
            <Alert variant="error" title="Warning" message={errors.root.message as string} />
          }
        </div>
      </div>
    </div>
  );
}
