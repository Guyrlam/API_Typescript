const index = require('./index.js');

class UserRespository{

    async getUserId(id: any){
        const client = await index.pool.connect();
        const query = 'SELECT * FROM public.users WHERE id = $1';
        try {
            const result = await client.query(query, [id]);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally{
            client.release();
        }
    }
    
    async updateUser(user: any){
        const client = await index.pool.connect();
        const param_username = user.username;
        const param_email = user.email;
        const param_firstName = user.firstName;
        const param_lastName = user.lastName;
        const param_password = user.password;
        const param_squad = user.squad;
        const param_isAdm = user.isAdm;
        const updateAt = new Date();
        const query = 'UPDATE public.users SET user_name = $1, email = $2, first_name = $3, last_name = $4, password = $5, squad = $6, is_admin = $7 WHERE id = $8';
        try {
            const result = await client.query(query, [param_username, param_email, param_firstName, param_lastName, param_password, param_squad, param_isAdm, updateAt]);
            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } finally{
            client.release();
        }
    }
}