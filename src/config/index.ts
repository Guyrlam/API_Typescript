import dotenv from "dotenv";
import { CorsOptions } from "cors";
import { env } from "process";

dotenv.config();

const port = env.PORT;

const corsOptions : CorsOptions = {
    origin:["http://127.0.0.1:5500"],
    credentials: true
};

export {port, corsOptions};