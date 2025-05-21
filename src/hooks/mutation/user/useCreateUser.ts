import userKeys from '@/query-key-factory/user';
import { createUser } from '@/services/userService';
import PaginatedList from '@/types/paginatedList';
import { UserCreate } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateUser = (paginatedListParams: PaginatedList) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UserCreate) => createUser(payload),
        onSuccess: () => {
            const userListKey = userKeys.paginatedList(paginatedListParams);
            queryClient.invalidateQueries({ queryKey: userListKey });
        }
    });
};
