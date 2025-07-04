import userKeys from '@/query-key-factory/user';
import { updateMe } from '@/services/userService';
import { SelfUpdate } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSelfUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: SelfUpdate) => updateMe(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.me() });
        }
    });
};
