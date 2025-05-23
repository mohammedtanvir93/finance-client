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