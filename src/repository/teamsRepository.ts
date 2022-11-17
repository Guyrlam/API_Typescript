import { pool } from './index';
import { UserRepository } from './userRepository';
import { ITeams } from '../interfaces/iteams';

export class TeamsRepository {
    async addTeams(_data: ITeams, _id: string) {
        const client = await pool.connect();
        const keys = Object.keys(_data as any);
        const indexes = keys.map((value, index) => `$${index + 1}`);
        const keystring = keys.join(', ');
        const indexstring = indexes.join(', ');
        const values = Object.values(_data as any);
        const query = `INSERT INTO 
        teams (${keystring}) 
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

    async getTeamById(id: string) {
        const client = await pool.connect();
        const query = 'SELECT * FROM public.Squad WHERE id = $1';
        try {
            const result = await client.query(query, [id]);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async updateTeam(teams: any) {
        const client = await pool.connect();
        const param_name = teams.name;
        const param_leader = teams.leader;
        const updateAt = new Date();
        const id = teams.id;
        const query =
            'UPDATE public.Squad SET name = $1, leader = $2, update_at = $3 WHERE id = $4';
        try {
            const result = await client.query(query, [
                param_name,
                param_leader,
                updateAt,
                id,
            ]);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async getTeams() {
        const client = await pool.connect();
        const query = 'SELECT * FROM public.Squad';
        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async getDelete(id: string) {
        const client = await pool.connect();
        const query = 'UPDATE public.Squad SET deleted_at = now() WHERE id = $1';
        try {
            const result = await client.query(query, [id]);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async remove(team_id: string, user_id: string) {
        const client = await pool.connect();
        const query = 'UPDATE public.Users SET squad = null WHERE id = $1';
        try {
            await client.query('BEGIN');
            const response = new UserRepository();
            const user = await response.getUserId(user_id);
            if (user[0].squad !== team_id)
                throw new Error('O usuário não pertence a esse time');
            const result = await client.query(query, [user_id]);
            await client.query('COMMIT');
            return result.rows;
        } catch (error: any) {
            await client.query('ROLLBACK');
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

    async addMember(team_id: string, user_id: string) {
        const client = await pool.connect();
        const query = 'UPDATE public.Users SET squad = $1 WHERE id = $2';
        try {
            await client.query('BEGIN');
            const response = new UserRepository();
            const user = await response.getUserId(user_id);
            if (user[0].squad !== null)
                throw new Error('O usuário já pertence a um time');
            const result = await client.query(query, [team_id, user_id]);
            await client.query('COMMIT');
            return result.rows;
        } catch (error: any) {
            await client.query('ROLLBACK');
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }
}
