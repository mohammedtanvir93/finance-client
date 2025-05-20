import { useQuery } from '@tanstack/react-query';
import { fetchRoles } from '@/services/roleService';
import roleKeys from '@/query-key-factory/role';

export const useRoles = () => {
    return useQuery({
        queryKey: roleKeys.list(),
        queryFn: fetchRoles,
    });
};
