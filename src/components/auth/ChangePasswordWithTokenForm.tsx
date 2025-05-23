"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMsg from "../form/error-msg";
import { useAddPassword } from "@/hooks/mutation/auth/useAddPassword";
import toast from 'react-hot-toast';
import { retrieve, store } from "@/utils/session";
import Alert from "../ui/alert/Alert";
import { useRouter } from 'next/navigation';

interface Props {
    token: string;
}

const passwordRules =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}\-_=+\\|;:'",.<>/?]).{8,}$/;

const schema = z
    .object({
        new_password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' })
            .max(50, { message: 'Password must be under 50 characters' })
            .regex(passwordRules, {
                message:
                    'Password must contain at least 1 uppercase letter, 1 number, and 1 special character',
            }),
        retype_new_password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' })
            .max(50, { message: 'Password must be under 50 characters' }),
    })
    .refine((data) => data.new_password === data.retype_new_password, {
        path: ['retype_new_password'],
        message: 'Passwords do not match',
    });

type FormFields = z.infer<typeof schema>;

export default function ChangePasswordWithTokenForm({ token }: Props) {
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
        mutate: addPassword
    } = useAddPassword(token);

    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);

    useEffect(() => {
        const token = retrieve("token");
        if (token) {
            router.replace("/users");
        }
    }, [router]);

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        clearErrors();
        toastId.current = toast.loading('Adding new password...');

        addPassword(data, {
            onSuccess: (result) => {
                store('token', result.access_token);
                toast.success('New password adding....');
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

                console.error('Failed to add new password');
            },
            onSettled: () => {
                if (toastId.current) {
                    toast.dismiss(toastId.current as string);
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
                            Welcome! Let’s Get Started
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Choose a password to protect your new account.
                        </p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-6">
                                <div>
                                    <Label>
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            error={errors.new_password !== undefined}
                                            {...register('new_password')}
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
                                    <ErrorMsg message={errors.new_password?.message} />
                                </div>
                                <div>
                                    <Label>
                                        Retype New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={showRetypePassword ? "text" : "password"}
                                            placeholder="Re-enter your new password"
                                            error={errors.retype_new_password !== undefined}
                                            {...register('retype_new_password')}
                                        />
                                        <span
                                            onClick={() => setShowRetypePassword(!showRetypePassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showRetypePassword ? (
                                                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                            ) : (
                                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                            )}
                                        </span>
                                    </div>
                                    <ErrorMsg message={errors.retype_new_password?.message} />
                                </div>
                                <div>
                                    <Button disabled={isSubmitting} type="submit" className="w-full" size="sm">
                                        Submit
                                    </Button>
                                </div>
                                {
                                    errors.root &&
                                    <Alert variant="error" title="Warning" message={errors.root.message as string} />
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
