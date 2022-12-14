import { Pool } from 'pg';
import { databaseConfig } from '../config';

const pool = new Pool(databaseConfig);

export { pool };
