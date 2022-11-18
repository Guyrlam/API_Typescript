import bcrypt from 'bcrypt';
import { pool } from './index';
import { IUser } from '../interfaces/iuser';
import { IUserUpdate } from '../interfaces/iuserUpd';

export class UserRepository {
    async addUser(_data: IUser) {
        const client = await pool.connect();

        try {
            let query =
                'SELECT * FROM public.users WHERE email = $1 AND deleted_at isnull';
            const findUser = await client.query(query, [_data.email]);
            if (findUser.rowCount) throw new Error('Este email já está cadastrado');

            const keys = Object.keys(_data as any);
            const indexes = keys.map((value, index) => `$${index + 1}`);
            const keystring = keys.join(', ');
            const indexstring = indexes.join(', ');
            const values = Object.values(_data as any);
            query = `INSERT INTO users (${keystring}) 
                        VALUES (${indexstring}) RETURNING *`;

            const result = await client.query({ text: query, values: values });
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    /* async loginUser(_email: string): Promise<any> {
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
    } */

    async getAllUsers() {
        const client = await pool.connect();
        const query = 'SELECT * FROM public.users WHERE deleted_at isnull';
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
        const query =
            'SELECT * FROM public.users WHERE id = $1 AND deleted_at isnull';
        try {
            const result = await client.query(query, [id]);
            return result.rows[0];
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async updateUser(_data: IUserUpdate, _id: string) {
        const client = await pool.connect();
        const keys = Object.keys(_data as any);
        const indexes = keys.map((value, index) => `$${index + 1}`);
        const values = Object.values(_data as any);
        let query = `UPDATE public.users SET`;
        const updateAt = new Date();
        for (let index = 0; index < indexes.length; index++) {
            query += ` ${keys[index]} = ${indexes[index]},`;
        }
        query += ` updated_at = $${indexes.length + 1} WHERE id = $${
            indexes.length + 2
        } AND deleted_at isnull RETURNING *`;
        values.push(updateAt, _id);
        try {
            const result = await client.query({ text: query, values: values });
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async login(_data: { email: string; password: string }) {
        const client = await pool.connect();
        const query =
            'SELECT * FROM public.users WHERE email = $1 AND deleted_at isnull';
        try {
            const findUser = await client.query(query, [_data.email]);
            if (!findUser.rowCount) throw new Error('Email não cadastrado');

            const comparePassword = await bcrypt.compare(
                _data.password,
                findUser.rows[0].password
            );
            if (!comparePassword) throw new Error('Login não autorizado');

            return findUser.rows[0];
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async isLeader(id: string) {
        const client = await pool.connect();
        const query =
            'SELECT * FROM public.squad WHERE leader = $1 AND deleted_at isnull';
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

    async delUser(id: string) {
        const client = await pool.connect();
        const query =
            'UPDATE public.users SET deleted_at = now() WHERE id = $1 AND deleted_at isnull';
        try {
            const result = await client.query(query, [id]);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }
}
