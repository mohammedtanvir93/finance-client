"use client";

import { useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "../form/error-msg";

interface Props {
    closeModal: () => void;
}

const passwordRules =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}\-_=+\\|;:'",.<>/?]).{8,}$/;

const schema = z
    .object({
        old_password: z
            .string()
            .min(8, { message: 'Old password must be at least 8 characters' })
            .max(50, { message: 'Old password must be under 50 characters' }),
        new_password: z
            .string()
            .min(8, { message: 'New password must be at least 8 characters' })
            .max(50, { message: 'New password must be under 50 characters' })
            .regex(passwordRules, {
                message:
                    'New password must contain at least 1 uppercase letter, 1 number, and 1 special character',
            }),
    });

type FormFields = z.infer<typeof schema>;

const ChangePasswordForm = ({ closeModal }: Props) => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting,
            errors,
        },
        setError
    } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormFields> = (data) => {

    };

    return (
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Change Your Password
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Update your password regularly to keep your account secure.
                </p>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                    <div className="mt-7">
                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Change Password
                        </h5>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Old Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showOldPassword ? "text" : "password"}
                                        placeholder="Enter your old password"
                                        error={errors.old_password !== undefined}
                                        {...register('old_password')}
                                    />
                                    <span
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                    >
                                        {showOldPassword ? (
                                            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                        ) : (
                                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                        )}
                                    </span>
                                </div>
                                <ErrorMsg message={errors.old_password?.message} />
                            </div>

                            <div className="col-span-2 lg:col-span-1">
                                <Label>New Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter your new password"
                                        error={errors.new_password !== undefined}
                                        {...register('new_password')}
                                    />
                                    <span
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                    >
                                        {showNewPassword ? (
                                            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                        ) : (
                                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                        )}
                                    </span>
                                </div>
                                <ErrorMsg message={errors.new_password?.message} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button disabled={isSubmitting} size="sm" variant="outline" onClick={closeModal}>
                        Close
                    </Button>
                    <Button type="submit" size="sm">
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default ChangePasswordForm;
