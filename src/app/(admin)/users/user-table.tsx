'use client';

import Button from "@/components/ui/button/Button";
import Pagination from "@/components/ui/pagination";
import SearchInput from "@/components/ui/search";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Plus, Trash } from 'lucide-react';
import { useState } from "react";
import UserForm, { IUser } from "./user-form";
import UserDetails, { IUserDetails } from "./user-details";

const userList: IUserDetails[] = [
    {
        id: 'ce27d86a-ab0c-4e9e-8fbc-79c6faba0e51',
        email: 'abc@gmail.com',
        name: 'ABC',
        role: 'ADMIN',
        status: 'ACTIVE',
        joinedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '649c5316-72f3-4b61-9bad-25d25ec0d1b5',
        email: 'def@gmail.com',
        name: 'DEF',
        role: 'EDITOR',
        status: 'PENDING',
        joinedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

const UserTable = () => {
    const [actionRow, setActionRow] = useState('');
    const [openUserForm, setOpenUserForm] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    const handleEdit = (editableUser: IUser) => {
        setUserDetails(null);
        setOpenUserForm(true);
        setUser(editableUser);
    };

    return (
        <>
            {
                userDetails
                &&
                <UserDetails
                    onEdit={(editableUser: IUser) => handleEdit(editableUser)}
                    user={userDetails}
                    onCloseModal={() => setUserDetails(null)}
                />
            }
            {
                openUserForm && <UserForm user={user} onCloseModal={() => setOpenUserForm(false)} />
            }
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
                            isHeader
                            className="px-2 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200"
                        >
                            Name
                        </TableCell>
                        <TableCell
                            isHeader
                            className="px-2 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200"
                        >
                            Email
                        </TableCell>
                        <TableCell
                            isHeader
                            className="px-2 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200"
                        >
                            Role
                        </TableCell>
                        <TableCell
                            isHeader
                            className="px-2 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200"
                        >
                            Status
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
                        userList.map(user => (
                            <TableRow key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                <TableCell className="py-4 sm:px-2 text-start">
                                    <span className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.name}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 sm:px-2 text-start">
                                    <span className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.email}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 sm:px-2 text-start">
                                    <span className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.role}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 sm:px-2 text-start">
                                    <span className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.status}
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

                                        {actionRow === user.id && (
                                            <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
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
                                                    <li>
                                                        <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            <Trash className="w-4 h-4" />
                                                            Remove
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Pagination totalItems={1} onPageOrPageItemChange={(page, itemsPerPage) => console.log(page, itemsPerPage)} />
        </>
    )
}

export default UserTable
