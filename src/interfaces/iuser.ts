import { RandomUUIDOptions } from 'crypto';

export interface IUser {
    id?: RandomUUIDOptions | string;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
    squad?: string;
    updated_at?: Date;
    created_at?: Date;
    deleted_at?: Date;
    is_admin?: boolean;
}
export interface ILogin {
    email: string;
    password: string;
}
export interface IUserUpdate {
    id?: RandomUUIDOptions | string;
    email: string;
    user_name?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    squad?: string;
    updated_at?: string;
    created_at?: string;
    deleted_at?: string;
    is_admin?: boolean;
}
