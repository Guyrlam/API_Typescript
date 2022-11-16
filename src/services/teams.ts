import * as validators from '../validators';
import { hashSecret } from '../config';
import { v4 as uuid } from 'uuid';
import { TeamsRepository } from '../repository/teamsRepository';
import { ITeams } from '../interfaces/iteams';
import bcrypt from 'bcrypt';

export default class TeamsServ {
    async addTeams(_data: ITeams): Promise<any> {
        const repo = new TeamsRepository();
        try {
            this.validate(_data);
            console.log(_data);
            _data.id = uuid();
            const data = await repo.addTeams(_data, _data.id);
            return { data, err: null, errCode: null };
        } catch (err: any) {
            // console.log(err);
            return { data: [], err: err.message, errCode: 500 };
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
    }
}