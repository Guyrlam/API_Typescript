export interface ITeams {
    id?: string;
    name: string;
    leader: string;
}

export interface ITeamList {
    id?: string;
    name: string;
    leader: any;
    employees: Array<any>;
}
