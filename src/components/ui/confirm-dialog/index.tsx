import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface Props {
    confirmBtnIcon: ReactNode;
    confirmBtnTitle: string;
    message: string;
    onCloseConfirmDialog: () => void;
    onConfirm: () => void;
}

const ConfirmDialog = ({
    confirmBtnIcon,
    confirmBtnTitle,
    message,
    onCloseConfirmDialog,
    onConfirm
}: Props) => {
    return (
        <Modal isOpen={true} onClose={onCloseConfirmDialog} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <p className="text-gray-500 text-start text-theme-sm dark:text-gray-400">{message}</p>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={onCloseConfirmDialog} startIcon={<X />}>
                        Close
                    </Button>
                    <Button
                        onClick={onConfirm}
                        size="sm"
                        startIcon={confirmBtnIcon}
                    >
                        {confirmBtnTitle}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
