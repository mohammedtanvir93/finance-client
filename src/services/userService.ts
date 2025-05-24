import http from '@/utils/custom-fetch'; // adjust path as needed
import PaginatedList from '@/types/paginatedList';
import { PaginatedUserResponse, UserCreate, UserDetails, UserUpdate } from '@/types/user';

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

export const fetchUser = async (id: string): Promise<UserDetails> => {
    const response = await http.get<UserDetails>(`${BASE_URL}/users/${id}`);
    return response;
};

export const createUser = async (payload: UserCreate): Promise<UserDetails> => {
    const response = await http.post<UserDetails>(`${BASE_URL}/users`, payload);
    return response;
};

export const updateUser = async (id: string, payload: UserUpdate): Promise<UserDetails> => {
    const response = await http.patch<UserDetails>(`${BASE_URL}/users/${id}`, payload);
    return response;
};

export const deleteUser = async (id: string): Promise<void> => {
    await http.delete(`${BASE_URL}/users/${id}`);
};

export const fetchMe = async (): Promise<UserDetails> => {
    const response = await http.get<UserDetails>(`${BASE_URL}/users/me`);
    return response;
};