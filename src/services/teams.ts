import * as validators from '../validators';
import { hashSecret } from '../config';
import { v4 as uuid, validate as uuidValidate } from 'uuid';
import { TeamsRepository } from '../repository/teamsRepository';
import { ITeams } from '../interfaces/iteams';

export default class TeamsServ {
    async addTeams(_data: ITeams): Promise<any> {
        try {
            const repo = new TeamsRepository();
            this.validate(_data);
            _data.id = uuid();
            const data = await repo.addTeams(_data, _data.id);
            repo.addUserTeams(_data.leader, _data.id);
            return { data, err: null, errCode: null };
        } catch (err: any) {
            // console.log(err);
            return { data: [], err: err.message, errCode: 500 };
        }
    }

    async addUserTeam(_idUser: string, _idSquad: string): Promise<any> {
        try {
            const repo = new TeamsRepository();
            if (!uuidValidate(_idUser) && !uuidValidate(_idSquad)) {
                throw new Error('500|ids invalid');
            }
            const data = await repo.addUserTeams(_idUser, _idSquad);
            return { data, err: null, errCode: null };
        } catch (err: any) {
            // console.log(err);
            return { data: [], err: err.message, errCode: 500 };
        }
    }

    async getTeams(): Promise<{
        team: ITeams[];
        err: null | Error;
        errCode: null | number;
    }> {
        try {
            const repo = new TeamsRepository();
            const team = await repo.getTeams();
            return { team, err: null, errCode: null };
        } catch (err: any) {
            return { team: [], err: err.message, errCode: 500 };
        }
    }

    async getTeamById(id: string): Promise<{
        team: ITeams[];
        err: null | Error;
        errCode: null | number;
    }> {
        try {
            const repo = new TeamsRepository();
            const team = await repo.getTeamById(id);
            return { team, err: null, errCode: null };
        } catch (err: any) {
            return { team: [], err: err.message, errCode: 500 };
        }
    }

    async delTeams(id: string): Promise<{
        team: ITeams[];
        err: null | Error;
        errCode: null | number;
    }> {
        try {
            const repo = new TeamsRepository();
            const team = await repo.getDelete(id);
            return { team, err: null, errCode: null };
        } catch (err: any) {
            return { team: [], err: err.message, errCode: 500 };
        }
    }

    async removeMember(
        team_id: string,
        user_id: string
    ): Promise<{
        team: ITeams[];
        err: null | string;
        errCode: null | number;
    }> {
        try {
            const repo = new TeamsRepository();
            const team = await repo.remove(team_id, user_id);
            return { team, err: null, errCode: null };
        } catch (err: any) {
            return { team: [], err: err.message, errCode: 500 };
        }
    }

    public validate(_data: ITeams) {
        const validator = new TeamsValidator(_data); // alterar
        if (validator.errors) {
            console.log(validator.errors);
            throw new Error(validator.errors);
        }
    }
}

class TeamsValidator extends validators.Validator {
    constructor(data: ITeams) {
        super(data);

        this.data.name = this.checkName(data.name);
        this.data.leader = this.checkLeader(data.leader);
    }

    checkName(name: string) {
        const validator = new validators.NameValidator(name, { max_length: 255 });
        if (validator.errors) this.errors += `name:${validator.errors},`;
        return validator.data;
    }

    checkLeader(id: string) {
        const validator = new validators.UUIDValidator(id, { max_length: 255 });
        if (validator.errors) this.errors += `id_user_leader:${validator.errors},`;
        return validator.data;
    }
}
