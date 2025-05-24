import { ChangePasswordWithToken } from './auth';
export interface ChangePasswordWithToken {
    new_password: string;
    retype_new_password: string;
}

export interface BearerToken {
    access_token: string;
}

export interface Login {
    username: string;
    password: string;
}

export interface ChangePassword {
    old_password: string;
    new_password: string;
}