'use client';

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { Save, X } from 'lucide-react';

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

const UserForm = ({ create = true, onCloseModal }: IProps) => {

    const handleSave = () => {
        console.log("Saving changes...");
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
                <form className="flex flex-col">
                    <div className="mt-7">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div className="col-span-2">
                                <Label>Email</Label>
                                <Input type="text" placeholder="Email" />
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Name</Label>
                                <Input type="text" placeholder="Name" />
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Role</Label>
                                <Input type="text" placeholder="Role" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={onCloseModal} startIcon={<X />}>
                            Close
                        </Button>
                        <Button size="sm" onClick={handleSave} startIcon={<Save />}>
                            {create ? 'Create' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UserForm;
