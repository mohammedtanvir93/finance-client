'use client';

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { Save, X } from 'lucide-react';
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IUser {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

interface IProps {
    create?: boolean;
    user?: IUser;
    onCloseModal: () => void;
}

const schema = z.object({
    email: z.string().email().min(3).max(100),
    name: z.string().min(3).max(255),
    role: z.string().min(3).max(100)
});

type FormFields = z.infer<typeof schema>;

const UserForm = ({ create = true, onCloseModal }: IProps) => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormFields>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log("Saving changes...", data);
        onCloseModal();
    };

    return (
        <Modal isOpen={true} onClose={onCloseModal} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {create ? 'Create New User' : 'Update New User'}
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
                                {errors.email?.message && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    error={errors.name !== undefined}
                                    {...register('name')}
                                />
                                {errors.name?.message && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Role</Label>
                                <Input
                                    type="text"
                                    placeholder="Role"
                                    error={errors.role !== undefined}
                                    {...register('role')}
                                />
                                {errors.role?.message && (
                                    <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={onCloseModal} startIcon={<X />}>
                            Close
                        </Button>
                        <Button type="submit" disabled={isSubmitting} size="sm" startIcon={<Save />}>
                            {create ? 'Create' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UserForm;
