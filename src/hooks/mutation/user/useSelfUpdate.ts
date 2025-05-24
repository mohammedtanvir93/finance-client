import userKeys from '@/query-key-factory/user';
import { updateMe } from '@/services/userService';
import { SelfUpdate } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: SelfUpdate) => updateMe(payload),
        onSuccess: () => {
            const userListKey = userKeys.me();
            queryClient.invalidateQueries({ queryKey: userListKey });
        }
    });
};
