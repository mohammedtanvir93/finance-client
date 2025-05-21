import userKeys from '@/query-key-factory/user';
import { fetchUsers } from '@/services/userService';
import PaginatedList from '@/types/paginatedList';
import { PaginatedUserResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const useUsers = (params: PaginatedList) => {
    return useQuery<PaginatedUserResponse>({
        queryKey: userKeys.paginatedList(params),
        queryFn: () => fetchUsers(params),
        placeholderData: (prev) => prev
    });
};
