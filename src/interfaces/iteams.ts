import { RandomUUIDOptions } from 'crypto';

export interface ITeams {
    id?: RandomUUIDOptions | string;
    name: string;
    leader: RandomUUIDOptions;
}
