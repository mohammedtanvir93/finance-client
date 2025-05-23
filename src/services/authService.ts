import http from '@/utils/custom-fetch';
import { BearerToken, ChangePasswordWithToken, Login } from '@/types/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toUrlEncoded = (obj: Record<string, any>) =>
    new URLSearchParams(obj).toString();

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const addPassword = async (token: string, payload: ChangePasswordWithToken): Promise<BearerToken> => {
    const response = await http.post<BearerToken>(`${BASE_URL}/auth/change-password-with-token/${token}`, payload);
    return response;
};

export const login = async (payload: Login): Promise<BearerToken> => {
    const response = await http.post<BearerToken>(
        `${BASE_URL}/auth/login`,
        toUrlEncoded(payload),
        {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
    );
    return response;
};