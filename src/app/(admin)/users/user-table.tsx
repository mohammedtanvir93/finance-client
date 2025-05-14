'use client';

import Select from '@/components/form/Select';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react';
import { useState } from "react";
import SearchInput from "@/components/ui/search";

const options = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "50", label: "50" },
];

const UserTable = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    return (
        <>
            <SearchInput
                label='Search Users'
                onSearchKeyChange={(searchKey) => setSearchKey(searchKey)}
            />
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
                            Created At
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
                                Created At
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
            <div className="flex items-center justify-between w-full mt-3">
                <div className="relative w-[100px] flex items-center">
                    <Select
                        options={options}
                        placeholder="Select"
                        onChange={(value) => console.log(value)}
                        className="dark:bg-dark-900"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none dark:text-gray-400">
                        <ChevronDown width={12} />
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronsLeft className="w-4 h-4 text-gray-600 dark:text-white" />
                    </button>
                    <button className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-white" />
                    </button>
                    <input
                        type="number"
                        min="1"
                        className="w-[60px] px-2 py-1 border rounded text-center text-gray-700 dark:bg-gray-800 dark:text-white"
                        defaultValue={1}
                    />
                    <button className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronRight className="w-4 h-4 text-gray-600 dark:text-white" />
                    </button>
                    <button className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronsRight className="w-4 h-4 text-gray-600 dark:text-white" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserTable
