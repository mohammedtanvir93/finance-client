import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { Metadata } from 'next';
import UserTable from './user-table';

export const metadata: Metadata = {
    description: "Browse through a list of users with detailed information in a clean, easy-to-read table format.",
    title: "User List",
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
