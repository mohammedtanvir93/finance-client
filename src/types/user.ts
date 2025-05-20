import { RoleBase } from './role';

type IUserBase = {
    id: string;
    email: string;
    fullname: string;
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    joined_at: string;
    created_at: string;
    updated_at: string;
}

export interface IUser extends IUserBase {
    role: RoleBase;
}

export interface PaginatedUserResponse {
    data: IUser[];
    total: number;
    limit: number;
    skip: number;
}  