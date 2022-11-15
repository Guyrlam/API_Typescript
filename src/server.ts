import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { port, corsOptions } from "./config";
import { route } from "./routes/router";

class App
{
    app : express.Application
    constructor ()
    {
        this.app = express();

        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true}));
        this.app.use(cors(corsOptions));

        this.app.use(route);
        
        this.app.listen(port, () => console.log(`Servidor rodando em: http://localhost:${port}`));
    }
}

const app = new App ();