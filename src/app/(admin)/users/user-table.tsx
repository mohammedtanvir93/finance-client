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
import { Plus } from 'lucide-react';
import { useState } from "react";

const UserTable = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <SearchInput
                    className="w-[500px]"
                    label="Search Users"
                    onSearchKeyChange={(searchKey) => setSearchKey(searchKey)}
                />

                <Button className="bg-green-600 hover:bg-green-700" size="sm" variant="primary" startIcon={<Plus />}>
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
                    <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <TableCell className="py-4 sm:px-2 text-start">
                            <span className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Name
                            </span>
                        </TableCell>
                        <TableCell className="py-4 sm:px-2 text-start">
                            <span className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Email
                            </span>
                        </TableCell>
                        <TableCell className="py-4 sm:px-2 text-start">
                            <span className="text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Role
                            </span>
                        </TableCell>
                        <TableCell className="py-4 sm:px-2 text-start">
                            <span className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                Status
                            </span>
                        </TableCell>
                        <TableCell className="py-4 sm:px-2 text-start">
                            <div
                                className="relative inline-block"
                                onMouseEnter={() => setIsVisible(true)}
                                onMouseLeave={() => setIsVisible(false)}
                            >
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2.5 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Action
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                {isVisible && (
                                    <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a></li>
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a></li>
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a></li>
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Pagination totalItems={1} onPageOrPageItemChange={(page, itemsPerPage) => console.log(page, itemsPerPage)} />
        </>
    )
}

export default UserTable
