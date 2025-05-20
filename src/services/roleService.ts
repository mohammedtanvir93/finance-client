import http from '@/utils/customFetch';
import { RoleBase } from '@/types/role';

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_HOST;

export const fetchRoles = (): Promise<RoleBase[]> => {
    return http.get<RoleBase[]>(`${API_BASE_URL}/roles`);
};
