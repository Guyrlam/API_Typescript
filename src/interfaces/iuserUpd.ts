import { RandomUUIDOptions } from 'crypto';

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
