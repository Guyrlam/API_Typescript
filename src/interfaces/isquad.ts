import { RandomUUIDOptions } from 'crypto';

export interface ISquad {
    id?: RandomUUIDOptions | string;
    name: string;
    leader: RandomUUIDOptions;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
