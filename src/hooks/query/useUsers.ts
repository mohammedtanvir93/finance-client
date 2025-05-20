import userKeys from '@/query-key-factory/user';
import { fetchUsers } from '@/services/userService';
import IPaginatedList from '@/types/paginatedList';
import { PaginatedUserResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const useUsers = (params: IPaginatedList) => {
    return useQuery<PaginatedUserResponse>({
        queryKey: userKeys.paginatedList(params),
        queryFn: () => fetchUsers(params),
        placeholderData: (prev) => prev
    });
};
