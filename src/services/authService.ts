import http from '@/utils/custom-fetch';
import { UserDetails } from '@/types/user';
import { ChangePasswordWithToken } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const addPassword = async (token: string, payload: ChangePasswordWithToken): Promise<UserDetails> => {
    const response = await http.post<UserDetails>(`${BASE_URL}/auth/change-password-with-token/${token}`, payload);
    return response;
};