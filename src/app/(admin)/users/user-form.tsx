'use client';

import ErrorMsg from "@/components/form/error-msg";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select, { Option } from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useCreateUser } from "@/hooks/mutation/user/useCreateUser";
import { useUpdateUser } from "@/hooks/mutation/user/useUpdateUser";
import { useRoles } from "@/hooks/query/role/useRoles";
import { useMe } from "@/hooks/query/user/useMe";
import PaginatedList from "@/types/paginatedList";
import { UserDetails } from "@/types/user";
import { check } from "@/utils/permission";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, Save, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { z } from "zod";

const apiToFormFields = {
    fullname: 'name',
    email: 'email',
    status: 'status',
    role_id: 'role'
} as const;

type ErrorApiFieldType = keyof typeof apiToFormFields;

interface Props {
    user?: UserDetails | null;
    paginatedListParams: PaginatedList;
    onCloseModal: () => void;
}

const schema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .min(3, { message: "Email must be at least 3 characters" })
        .max(100, { message: "Email must be under 100 characters" })
        .email("Please enter a valid email address"),
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters" })
        .max(255, { message: "Name must be under 255 characters" }),
    role: z
        .string({ required_error: "Role is required" })
        .min(1, { message: "Role is required" }),
    status: z
        .string({ required_error: "Status is required" })
        .min(1, { message: "Status is required" })
        .optional()
});

type FormFields = z.infer<typeof schema>;

const statusOptions: Option[] = [
    {
        label: 'Active',
        value: 'ACTIVE'
    },
    {
        label: 'Pending',
        value: 'PENDING'
    },
    {
        label: 'Inactive',
        value: 'INACTIVE'
    }
];

const UserForm = ({
    onCloseModal,
    paginatedListParams,
    user
}: Props) => {
    const toastId = useRef<string | number | null>(null);

    const isCreating = useMemo(() => user === undefined, [user]);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {
            isSubmitting,
            errors,
        },
        setError
    } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });

    const {
        mutate: createUser
    } = useCreateUser(paginatedListParams);

    const {
        mutate: updateUser
    } = useUpdateUser(user?.id, paginatedListParams);

    const { data: roles } = useRoles();

    const roleOptions: Option[] = useMemo(() => {
        if (!roles) return [];

        return roles?.map(role => ({
            value: role.id,
            label: role.title
        }));
    }, [roles]);

    const { data: loggedInUser } = useMe();

    const canCreateUser = useMemo(() => {
        return check(
            loggedInUser, { name: 'create:users' }
        );
    }, [loggedInUser]);

    const canEditUser = useCallback((targetId?: string, providedId?: string) => {
        if (targetId && providedId) {
            return check(
                loggedInUser, { name: 'edit:users' }
            ) || check(
                loggedInUser, { name: 'editOwn:users', targetId, providedId }
            );
        }

        return check(
            loggedInUser, { name: 'edit:users' }
        );
    }, [loggedInUser]);

    useEffect(() => {
        if (user) {
            reset({
                email: user.email,
                name: user.fullname,
                role: user.role.id,
                status: user.status
            });
        }
    }, [user, reset]);

    const createNewUser = (data: FormFields) => {
        toastId.current = toast.loading('Creating user...');

        createUser({
            email: data.email,
            fullname: data.name,
            role_id: data.role
        }, {
            onSuccess: () => {
                toast.success('A new user created successfully');
                onCloseModal();
            },
            onError: (error) => {
                const errorDetails = error.message ? JSON.parse(error.message) : null;

                if (errorDetails?.detail?.errors)
                    showServerErrors(errorDetails.detail.errors);
                else if (errorDetails?.errors)
                    showServerErrors(errorDetails.errors);
            },
            onSettled: () => {
                if (toastId.current) {
                    toast.dismiss(toastId.current as string);
                    toastId.current = null;
                }
            }
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const showServerErrors = (errors: any) => {

        for (const field in (errors as string[])) {
            setError(
                apiToFormFields[field as ErrorApiFieldType],
                {
                    type: 'manual', message: errors[field]
                }
            );
        }
    };

    const updateExistingUser = (id: string, data: FormFields) => {
        toastId.current = toast.loading('Updating user...');

        updateUser({
            email: data.email,
            fullname: data.name,
            role_id: data.role,
            status: data.status as string
        }, {
            onSuccess: () => {
                toast.success('User information updated successfully');
                onCloseModal();
            },
            onError: (error) => {
                const errorDetails = error.message ? JSON.parse(error.message) : null;

                if (errorDetails?.detail?.errors)
                    showServerErrors(errorDetails.detail.errors);
                else if (errorDetails?.errors)
                    showServerErrors(errorDetails.errors);
            },
            onSettled: () => {
                if (toastId.current) {
                    toast.dismiss(toastId.current as string);
                    toastId.current = null;
                }
            }
        });
    };

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        if (isCreating)
            createNewUser(data);
        else if (!isCreating && user?.id)
            updateExistingUser(user.id, data);
    };

    return (
        <Modal isOpen={true} onClose={onCloseModal} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {isCreating ? 'Create New User' : 'Update User'}
                    </h4>
                </div>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-7">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div className="col-span-2">
                                <Label>Email</Label>
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    error={errors.email !== undefined}
                                    {...register('email')}
                                />
                                <ErrorMsg message={errors.email?.message} />
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    error={errors.name !== undefined}
                                    {...register('name')}
                                />
                                <ErrorMsg message={errors.name?.message} />
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Role</Label>
                                <div className="relative">
                                    <Controller
                                        name="role"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                error={errors.role !== undefined}
                                                options={roleOptions}
                                                placeholder="--- Select ---"
                                                value={field.value}
                                                onChange={(selected) => field.onChange(selected)}
                                                className="dark:bg-dark-900"
                                            />
                                        )}
                                    />
                                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                        <ChevronDownIcon />
                                    </span>
                                </div>
                                <ErrorMsg message={errors.role?.message} />
                            </div>
                            {
                                !isCreating &&
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Status</Label>
                                    <div className="relative">
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    error={errors.status !== undefined}
                                                    options={statusOptions}
                                                    placeholder="--- Select ---"
                                                    value={field.value}
                                                    onChange={(selected) => field.onChange(selected)}
                                                    className="dark:bg-dark-900"
                                                />
                                            )}
                                        />
                                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                            <ChevronDownIcon />
                                        </span>
                                    </div>
                                    <ErrorMsg message={errors.status?.message} />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={onCloseModal} startIcon={<X />}>
                            Close
                        </Button>
                        {
                            isCreating && canCreateUser &&
                            <Button type="submit" disabled={isSubmitting} size="sm" startIcon={<Save />}>
                                Create
                            </Button>
                        }
                        {
                            !isCreating && canEditUser(loggedInUser?.id, user?.id) &&
                            <Button type="submit" disabled={isSubmitting} size="sm" startIcon={<Save />}>
                                Update
                            </Button>
                        }
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UserForm;
