import { RoleBase, RoleDetails } from './role';

type UserBase = {
    id: string;
    email: string;
    fullname: string;
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    joined_at: Date;
    created_at: Date;
    updated_at: Date;
}

export interface User extends UserBase {
    role: RoleBase;
}

export interface UserDetails extends UserBase {
    role: RoleDetails;
}

export interface PaginatedUserResponse {
    data: User[];
    total: number;
    limit: number;
    skip: number;
}  