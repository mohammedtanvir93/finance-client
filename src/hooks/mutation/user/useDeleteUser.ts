import userKeys from '@/query-key-factory/user';
import { deleteUser } from '@/services/userService';
import PaginatedList from '@/types/paginatedList';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteUser = (paginatedListParams: PaginatedList) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            const userListKey = userKeys.paginatedList(paginatedListParams);
            queryClient.invalidateQueries({ queryKey: userListKey });
        }
    });
};
