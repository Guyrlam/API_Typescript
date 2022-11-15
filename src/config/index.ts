import dotenv from "dotenv";
import { CorsOptions } from "cors";
import { env } from "process";
import { PoolConfig } from "pg";

dotenv.config();

// server config
const port = env.PORT;

const corsOptions : CorsOptions = {
    origin:["http://127.0.0.1:5500"],
    credentials: true
};

// database config
const databaseConfig : PoolConfig = 
{
    host:env.DB_HOST,
    port:Number(env.DB_PORT),
    database:env.DB_DATABASE,
    user:env.DB_USER,
    password:env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}

export {port, corsOptions, databaseConfig};