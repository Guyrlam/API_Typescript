import * as validators from '../validators';
import { hashSecret } from '../config';
import { v4 as uuid } from 'uuid';
import { UserRepository } from '../repository/userRepository';
import { IUser } from '../interfaces/iuser';
import bcrypt from 'bcrypt';

export default class UsersServ {
    async getAllUsers(): Promise<any> {
        const repo = new UserRepository();
        try {
            const user = await repo.getAllUsers();
            return { user, err: null, errCode: null };
        } catch (err: any) {
            // console.log(err);
            return { user: [], err: err.message, errCode: 500 };
        }
    }

    async addUser(_data: IUser): Promise<any> {
        const repo = new UserRepository();
        try {
            this.validate(_data);
            console.log(_data);
            _data.password = await this.hashPassword(_data.password);
            _data.is_admin = false;
            _data.id = uuid();
            const data = await repo.addUser(_data, _data.is_admin, _data.id);
            return { data, err: null, errCode: null };
        } catch (err: any) {
            // console.log(err);
            return { data: [], err: err.message, errCode: 500 };
        }
    }

    public validate(_data: IUser) {
        const validator = new UserValidator(_data);
        if (validator.errors) {
            console.log(validator.errors);
            throw new Error(validator.errors);
        }
    }
    async hashPassword(plaintextPassword: string) {
        const hash = await bcrypt.hash(plaintextPassword, hashSecret);
        return hash;
    }

    async comparePassword(plaintextPassword: string, hash: string) {
        const result = await bcrypt.compare(plaintextPassword, hash);
        return result;
    }
}

class UserValidator extends validators.Validator {
    constructor(data: IUser) {
        super(data);

        this.data.email = this.checkEmail(data.email);
        this.data.user_name = this.checkUserName(data.user_name);
        this.data.first_name = this.checkFirstName(data.first_name);
        this.data.last_name = this.checkLastName(data.last_name);
        this.data.password = this.checkPassword(data.password);
    }

    checkEmail(email: string) {
        const validator = new validators.EmailValidator(email, { max_length: 255 });
        if (validator.errors) this.errors += `email:${validator.errors},`;
        return validator.data;
    }

    checkUserName(name: string) {
        const validator = new validators.NameValidator(name, { max_length: 255 });
        if (validator.errors) this.errors += `user_name:${validator.errors},`;
        return validator.data;
    }
    checkFirstName(name: string) {
        const validator = new validators.NameValidator(name, { max_length: 255 });
        if (validator.errors) this.errors += `first_name:${validator.errors},`;
        return validator.data;
    }
    checkLastName(name: string) {
        const validator = new validators.NameValidator(name, { max_length: 255 });
        if (validator.errors) this.errors += `last_name:${validator.errors},`;
        return validator.data;
    }

    checkPassword(password: string) {
        const validator = new validators.PasswordValidator(password, {
            max_length: 255,
        });
        if (validator.errors) this.errors += `password:${validator.errors},`;
        return validator.data;
    }
}
