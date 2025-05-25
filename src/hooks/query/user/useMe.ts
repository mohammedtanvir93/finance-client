import userKeys from '@/query-key-factory/user';
import { fetchMe } from '@/services/userService';
import { UserDetails } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
    return useQuery<UserDetails>({
        queryKey: userKeys.me(),
        queryFn: () => fetchMe(),
        staleTime: 60 * 1000,
        refetchInterval: 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true
    });
};
