import bcrypt from 'bcrypt';
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

    async updateUser(_data: IUser) {
        const client = await pool.connect();
        const param_id = _data.id;
        const param_username = _data.user_name;
        const param_email = _data.email;
        const param_firstName = _data.first_name;
        const param_lastName = _data.last_name;
        const param_password = _data.password;
        const param_squad = _data?.squad;
        const param_isAdm = _data?.is_admin;
        const updateAt = new Date();
        const query =
            'UPDATE public.users SET user_name = $1, email = $2, first_name = $3, last_name = $4, password = $5, squad = $6, is_admin = $7, updated_at = $8 WHERE id = $9';
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
                param_id,
            ]);
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

    async delUser(id: string) {
        const client = await pool.connect();
        const query = 'UPDATE public.users SET deleted_at = now() WHERE id = $1';
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
