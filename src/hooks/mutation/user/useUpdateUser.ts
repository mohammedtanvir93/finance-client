import userKeys from '@/query-key-factory/user';
import { updateUser } from '@/services/userService';
import PaginatedList from '@/types/paginatedList';
import { UserUpdate } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateUser = (id: string | undefined, paginatedListParams: PaginatedList) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UserUpdate) => {
            if (!id) {
                return Promise.reject('Invalid user ID');
            }

            return updateUser(id, payload);
        },
        onSuccess: () => {
            const userListKey = userKeys.paginatedList(paginatedListParams);
            queryClient.invalidateQueries({ queryKey: userListKey });
        }
    });
};
