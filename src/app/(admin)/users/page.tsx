
import { Metadata } from 'next';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import UserTable from './user-table';

export const metadata: Metadata = {
    title: "User Information",
    description: "Browse through a list of users with detailed information in a clean, easy-to-read table format.",
};

const UserList = () => {
    return (
        <div>
            <PageBreadcrumb pageTitle="User List" />
            <UserTable />
        </div>
    )
};

export default UserList;
