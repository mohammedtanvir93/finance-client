'use client';

import SortIcon from "@/components/tables/SortIcon";
import Badge, { BadgeColor } from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import Pagination from "@/components/ui/pagination";
import SearchInput from "@/components/ui/search";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUsers } from '@/hooks/query/useUsers';
import usePagination from "@/hooks/usePagination";
import { IUser } from "@/types/user";
import { Eye, Pencil, Plus, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import UserDetails, { IUserDetails } from "./user-details";

type UserStatus = IUser['status'];

const STATUS_BADGES: Record<UserStatus, BadgeColor> = {
    'ACTIVE': 'success',
    'PENDING': 'info',
    'INACTIVE': 'warning'
};

const UserTable = () => {
    const toastId = useRef<string | number | null>(null);

    const [actionRow, setActionRow] = useState('');
    const [openUserForm, setOpenUserForm] = useState(false);
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [removableUser, setRemovableUser] = useState<IUserDetails | null>(null);
    const {
        searchKey, setSearchKey,
        page, setPage,
        itemsPerPage, setItemsPerPage,
        sortBy, setSortBy,
        sortOrder, setSortOrder, toggleSortOrder
    } = usePagination('created_at', 'asc');

    const { data: paginatedResponse, isLoading, error } = useUsers({
        skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage,
        filter: {
            search: searchKey,
            sort: {
                sortBy: sortBy,
                sortOrder: sortOrder,
            },
        },
    });

    useEffect(() => {
        if (isLoading && toastId.current === null) {
            toastId.current = toast.loading('Loading users...');
        }

        if (!isLoading && toastId.current) {
            toast.dismiss(toastId.current);
            toastId.current = null;

            if (error) {
                toast.error('Failed to load users');
            }
        }
    }, [isLoading, error]);

    useEffect(() => {
        setPage(1);
    }, [searchKey]);

    const handleEdit = (editableUser: IUser) => {
        setUserDetails(null);
        setOpenUserForm(true);
        setUser(editableUser);
    };

    const handleRemove = (removingUser: IUserDetails) => {
        console.log(`Deleted: ${removingUser.name}`);
        setRemovableUser(null);
    };

    const handleCloseForm = () => {
        setUser(null);
        setOpenUserForm(false);
    };

    const getStatusBadge = (status: UserStatus) => {
        return (
            <Badge variant="light" color={STATUS_BADGES[status]}>
                {status}
            </Badge>
        );
    };

    const handlePageOrPageItemChange = (page, itemsPerPage) => {
        setPage(page);
        setItemsPerPage(itemsPerPage);
    };

    return (
        <>
            {
                removableUser &&
                <ConfirmDialog
                    message={`Are you sure you want to delete user - ${removableUser.name} with email ${removableUser.email} ?`}
                    confirmBtnTitle="Delete"
                    confirmBtnIcon={<Trash />}
                    onCloseConfirmDialog={() => setRemovableUser(null)}
                    onConfirm={() => handleRemove(removableUser)}
                />
            }
            {/* {
                userDetails
                &&
                <UserDetails
                    onEdit={(editableUser: IUser) => handleEdit(editableUser)}
                    user={userDetails}
                    onCloseModal={() => setUserDetails(null)}
                />
            }
            {
                openUserForm && <UserForm user={user} onCloseModal={handleCloseForm} />
            } */}
            <div className="flex items-center justify-between mb-5">
                <SearchInput
                    className="w-[500px]"
                    label="Search Users"
                    onSearchKeyChange={(searchKey) => setSearchKey(searchKey)}
                />

                <Button
                    onClick={() => setOpenUserForm(true)}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                    variant="primary"
                    startIcon={<Plus />}>
                    Add User
                </Button>
            </div>

            <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                        <TableCell
                            onClick={() => setSortBy('fullname')}
                            isHeader
                            className="cursor-pointer px-2 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200"
                        >
                            <div className="flex items-center justify-between w-full">
                                <span>Name</span>
                                <SortIcon
                                    onDirChange={toggleSortOrder}
                                    matchingField="fullname"
                                    sortedColumn={sortBy}
                                    sortDir={sortOrder}
                                />
                            </div>
                        </TableCell>
                        <TableCell
                            onClick={() => setSortBy('email')}
                            isHeader
                            className="cursor-pointer px-2 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200"
                        >
                            <div className="flex items-center justify-between w-full">
                                <span>Email</span>
                                <SortIcon
                                    onDirChange={toggleSortOrder}
                                    matchingField="email"
                                    sortedColumn={sortBy}
                                    sortDir={sortOrder}
                                />
                            </div>
                        </TableCell>
                        <TableCell
                            onClick={() => setSortBy('role')}
                            isHeader
                            className="cursor-pointer px-2 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200"
                        >
                            <div className="flex items-center justify-between w-full">
                                <span>Role</span>
                                <SortIcon
                                    onDirChange={toggleSortOrder}
                                    matchingField="role"
                                    sortedColumn={sortBy}
                                    sortDir={sortOrder}
                                />
                            </div>
                        </TableCell>
                        <TableCell
                            onClick={() => setSortBy('status')}
                            isHeader
                            className="cursor-pointer px-2 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200"
                        >
                            <div className="flex items-center justify-between w-full">
                                <span>Status</span>
                                <SortIcon
                                    onDirChange={toggleSortOrder}
                                    matchingField="status"
                                    sortedColumn={sortBy}
                                    sortDir={sortOrder}
                                />
                            </div>
                        </TableCell>
                        <TableCell
                            isHeader
                            className="px-2 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200"
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {
                        paginatedResponse?.data.length === 0 &&
                        <TableRow key='no-user-found' className="hover:bg-gray-100 dark:hover:bg-gray-800">
                            <TableCell colSpan={5} className="py-4 sm:px-2 text-center text-red-500">
                                No User Found
                            </TableCell>
                        </TableRow>
                    }
                    {
                        paginatedResponse?.data.map(user => (
                            <TableRow key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                <TableCell className="py-4 sm:px-2 text-start">
                                    <span className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.fullname}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 sm:px-2 text-start">
                                    <span className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.email}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 sm:px-2 text-start">
                                    <span className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.role.title}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 sm:px-2 text-start">
                                    <span className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {getStatusBadge(user.status)}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 sm:px-2 text-start">
                                    <div
                                        className="relative inline-block"
                                        onMouseEnter={() => setActionRow(user.id)}
                                        onMouseLeave={() => setActionRow('')}
                                    >
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2.5 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Action
                                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg>
                                        </button>

                                        {/* {actionRow === user.id && (
                                            <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-26 dark:bg-gray-700">
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                    <li onClick={() => handleEdit(user)}>
                                                        <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            <Pencil className="w-4 h-4" />
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={() => setUserDetails(user)}
                                                            href="#"
                                                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            Details
                                                        </a>
                                                    </li>
                                                    <li onClick={() => setRemovableUser(user)}>
                                                        <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            <Trash className="w-4 h-4" />
                                                            Remove
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )} */}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Pagination page={page} totalItems={paginatedResponse?.total || 0} onPageOrPageItemChange={(page, itemsPerPage) => handlePageOrPageItemChange(page, itemsPerPage)} />
        </>
    )
}

export default UserTable
