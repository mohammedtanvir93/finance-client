'use client';

import { Metadata } from 'next';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Select from '@/components/form/Select';

// export const metadata: Metadata = {
//   title: "User Information",
//   description: "Browse through a list of users with detailed information in a clean, easy-to-read table format.",
// };

const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
];

const UserList = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
        <PageBreadcrumb pageTitle="User List" />
        <div className="relative w-full xl:w-[430px] mb-4">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 w-5 h-5" />
            <input
                type="text"
                placeholder="Search or type command..."
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
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
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
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
            {/* Left: Select dropdown */}
            <div className="relative w-[120px] flex items-center">
                <Select
                options={options}
                placeholder="Select Option"
                onChange={(value) => console.log(value)}
                className="dark:bg-dark-900"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none dark:text-gray-400">
                <ChevronDownIcon />
                </span>
            </div>

            {/* Right: Pagination controls */}
            <div className="flex items-center space-x-2">
                <button className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <DoubleArrowLeftIcon className="w-4 h-4 text-gray-600 dark:text-white" />
                </button>
                <button className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <ChevronLeftIcon className="w-4 h-4 text-gray-600 dark:text-white" />
                </button>
                <input
                type="number"
                min="1"
                className="w-[60px] px-2 py-1 border rounded text-center text-gray-700 dark:bg-gray-800 dark:text-white"
                defaultValue={1}
                />
                <button className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <ChevronRightIcon className="w-4 h-4 text-gray-600 dark:text-white" />
                </button>
                <button className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <DoubleArrowRightIcon className="w-4 h-4 text-gray-600 dark:text-white" />
                </button>
            </div>
        </div>
    </div>
  )
};

export default UserList;
