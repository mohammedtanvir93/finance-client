"use client";

import { UserDetails } from "@/types/user";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "../form/error-msg";
import { useRef } from "react";
import { useSelfUpdate } from "@/hooks/mutation/user/useSelfUpdate";
import toast from "react-hot-toast";

interface Props {
    loggedInUser?: UserDetails;
    closeModal: () => void;
}

const schema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .min(3, { message: "Email must be at least 3 characters" })
        .max(100, { message: "Email must be under 100 characters" })
        .email("Please enter a valid email address"),
    fullname: z
        .string()
        .min(1, { message: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters" })
        .max(255, { message: "Name must be under 255 characters" })
});

type FormFields = z.infer<typeof schema>;

type ErrorFieldType = keyof FormFields;

const UserProfileEditForm = ({ loggedInUser, closeModal }: Props) => {
    const toastId = useRef<string | number | null>(null);

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

    const {
        mutate: selfUpdate
    } = useSelfUpdate();

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        toastId.current = toast.loading('Profile updating...');

        selfUpdate(data, {
            onSuccess: () => {
                closeModal();
                toast.success('Profile updated successfully');
            },
            onError: (error) => {
                const errorDetails = error.message ? JSON.parse(error.message) : null;

                if (errorDetails) {
                    const errors = errorDetails?.detail?.errors || errorDetails?.errors;

                    for (const field in (errors as string[])) {
                        setError(
                            field as ErrorFieldType,
                            {
                                type: 'manual', message: errors[field]
                            }
                        );
                    }
                }

                console.error('Failed to update profile');
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
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Edit Personal Information
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Update your details to keep your profile up-to-date.
                </p>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                    <div className="mt-7">
                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Personal Information
                        </h5>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Fullname</Label>
                                <Input
                                    type="text"
                                    defaultValue={loggedInUser?.fullname}
                                    error={errors.fullname !== undefined}
                                    {...register('fullname')}
                                />
                                <ErrorMsg message={errors.fullname?.message} />
                            </div>

                            <div className="col-span-2 lg:col-span-1">
                                <Label>Email Address</Label>
                                <Input
                                    type="text"
                                    defaultValue={loggedInUser?.email}
                                    error={errors.email !== undefined}
                                    {...register('email')}
                                />
                                <ErrorMsg message={errors.email?.message} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={closeModal}>
                        Close
                    </Button>
                    <Button size="sm" disabled={isSubmitting} type="submit" >
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default UserProfileEditForm;
