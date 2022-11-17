import bcrypt from 'bcrypt';
import { parse as uuidParse, v4 as uuid } from 'uuid';
import { IUserUpdate } from '../interfaces/iuserUpd';
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

    async updateUser(_id: string, _data: IUserUpdate) {
        const client = await pool.connect();
        const keys = Object.keys(_data as any);
        const indexes = keys.map((value, index) => `${value} = $${index + 1}`);
        const keystring = keys.join(', ');
        const indexstring = indexes.join(', ');
        const values = Object.values(_data as any);
        values.push(_id);
        const query = `UPDATE public.users SET ${indexstring} WHERE id = $${
            indexes.length + 1
        }`;
        try {
            const result = await client.query(query, values);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async login(_data: { email: string; password: string }) {
        const client = await pool.connect();
        const query = 'SELECT * FROM public.users WHERE email = $1';
        try {
            const findUser = await client.query(query, [_data.email]);
            if (!findUser.rowCount) throw new Error('404|Email não cadastrado');

            const comparePassword = await bcrypt.compare(
                _data.password,
                findUser.rows[0].password
            );
            // console.log(comparePassword)
            if (!comparePassword) throw new Error('401|Login não autorizado');

            return findUser.rows[0];
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async isLeader(id: string) {
        const client = await pool.connect();
        const query = 'SELECT * FROM public.squad WHERE leader = $1';
        try {
            const leader = await client.query(query, [id]);
            if (!leader.rowCount) return null;

            return leader.rows[0].id;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }
}
