import { pool } from './index';
import { IUser } from '../interfaces/iuser';

export class UserRepository {
    async addUser(_data: IUser) {
        const client = await pool.connect();
        const keys = Object.keys(_data as any);
        const indexes = keys.map((value, index) => `$${index + 1}`);
        const keystring = keys.join(', ');
        const indexstring = indexes.join(', ');
        const values = Object.values(_data as any);
        const query = `INSERT INTO users (${keystring}) 
                       VALUES (${indexstring}) RETURNING *`;
        try {
            console.log(Object.values(_data));
            const result = await client.query({ text: query, values: values });
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async loginUser(_email: string): Promise<any> {
        const client = await pool.connect();
        const query = `SELECT * FROM users a WHERE a.email=$1 `;
        try {
            const result = await client.query(query, [_email]);
            return result;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async getAllUsers() {
        const client = await pool.connect();
        const query = 'SELECT * FROM public.users';
        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async getUserId(id: any) {
        const client = await pool.connect();
        const query = 'SELECT * FROM public.users WHERE id = $1';
        try {
            const result = await client.query(query, [id]);
            return result.rows[0];
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async updateUser(user: any) {
        const client = await pool.connect();
        const param_username = user.username;
        const param_email = user.email;
        const param_firstName = user.firstName;
        const param_lastName = user.lastName;
        const param_password = user.password;
        const param_squad = user.squad;
        const param_isAdm = user.isAdm;
        const updateAt = new Date();
        const query =
            'UPDATE public.users SET user_name = $1, email = $2, first_name = $3, last_name = $4, password = $5, squad = $6, is_admin = $7 WHERE id = $8';
        try {
            const result = await client.query(query, [
                param_username,
                param_email,
                param_firstName,
                param_lastName,
                param_password,
                param_squad,
                param_isAdm,
                updateAt,
            ]);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }
}
