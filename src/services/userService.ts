import http from '@/utils/customFetch'; // adjust path as needed
import PaginatedList from '@/types/paginatedList';
import { PaginatedUserResponse } from '@/types/user';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const fetchUsers = async (params: PaginatedList): Promise<PaginatedUserResponse> => {
    const queryParams = {
        skip: params.skip,
        limit: params.limit,
        search: params.filter.search,
        sort_by: params.filter.sort.sortBy,
        sort_order: params.filter.sort.sortOrder,
    };

    const response = await http.get<PaginatedUserResponse>(`${BASE_URL}/users`, {}, queryParams);
    return response;
};
