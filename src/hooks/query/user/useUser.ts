import userKeys from '@/query-key-factory/user';
import { fetchUser } from '@/services/userService';
import { UserDetails } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const useUser = (id: string) => {
    return useQuery<UserDetails>({
        queryKey: userKeys.details(id),
        queryFn: () => fetchUser(id),
        enabled: id !== ''
    });
};
