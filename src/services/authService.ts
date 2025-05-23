import http from '@/utils/custom-fetch';
import { BearerToken, ChangePasswordWithToken } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const addPassword = async (token: string, payload: ChangePasswordWithToken): Promise<BearerToken> => {
    const response = await http.post<BearerToken>(`${BASE_URL}/auth/change-password-with-token/${token}`, payload);
    return response;
};