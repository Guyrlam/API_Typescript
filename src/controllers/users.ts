import { Request, Response } from 'express';
import UsersServ from '../services/users';
import { IUser } from '../interfaces/iuser';
import jwt from 'jsonwebtoken';
import { hashSecret } from '../config';

export async function register(req: Request, res: Response) {
    const userData: IUser = req.body;
    try {
        const newUser = new UsersServ();
        const response = await newUser.addUser(userData);
        // console.log(userData)
        const user_id = response.data.id;
        const token = jwt.sign({ id: user_id }, hashSecret, { expiresIn: '1800s' });
        const timer = 900000;
        res.cookie('token', token, { maxAge: timer, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } catch (e: any) {
        // console.log(e);
        return APIResponse.error(res, (e as Error).message);
    }
}

class APIResponse {
    static error(res: Response, data: string) {
        //console.log(data)
        const msgInfos = (data as string).split(/\|/gim);
        //console.log(msgInfos);
        const msgs = msgInfos[1].replace(/(,$)/gim, '').split(',');

        res.status(Number(msgInfos[0])).json({
            data: null,
            messages: msgs,
        });
    }

    static sucess(res: Response, data: any, status = 200) {
        return res.status(status).json({
            data: data,
            messages: [],
        });
    }
}
