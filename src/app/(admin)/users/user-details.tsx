import { Modal } from "@/components/ui/modal";
import { useMe } from "@/hooks/query/user/useMe";
import { User, UserDetails as UserInfo } from "@/types/user";
import { getFormattedDatetime } from "@/utils/date";
import { check } from "@/utils/permission";
import getStatusBadge from "@/utils/user-status-badge";
import { Pen } from "lucide-react";
import { useCallback } from "react";

interface Props {
    user: UserInfo;
    onCloseModal: () => void;
    onEdit: (editableUserId: string) => void;
}

const UserDetails = ({
    onCloseModal,
    onEdit,
    user
}: Props) => {
    const { data: loggedInUser } = useMe();

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

    return (
        <Modal isOpen={true} onClose={onCloseModal} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                {
                    canEditUser(loggedInUser?.id, user.id) &&
                    <button
                        onClick={() => onEdit(user.id)}
                        className="flex mb-4 w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                        < Pen width={18} height={18} />
                        Edit
                    </button>
                }

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            User Details
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Name
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {user.fullname}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Email
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {user.email}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Role
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {user.role.title}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Status
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {getStatusBadge(user.status)}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Joined At
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {user.joined_at ? getFormattedDatetime(user.joined_at) : 'Not Yet'}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Created At
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {getFormattedDatetime(user.created_at)}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Updated At
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {getFormattedDatetime(user.updated_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default UserDetails;
