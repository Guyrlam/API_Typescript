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

}