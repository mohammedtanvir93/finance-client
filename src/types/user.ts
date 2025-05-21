import { RoleBase } from './role';

type UserBase = {
    id: string;
    email: string;
    fullname: string;
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    joined_at: string;
    created_at: Date;
    updated_at: Date;
}

export interface User extends UserBase {
    role: RoleBase;
}

export interface IUserDetails extends UserBase {
    joined_at: Date;
    change_password_token: string;
}

export interface PaginatedUserResponse {
    data: User[];
    total: number;
    limit: number;
    skip: number;
}  