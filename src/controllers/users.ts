import { Request, Response } from 'express';
import UsersServ from '../services/users';
import { IUser, ILogin } from '../interfaces/iuser';
import { AuthRequest } from '../interfaces/irequest';
import jwt from 'jsonwebtoken';
import { hashSecret } from '../config';
import { APIResponse } from '../utils/api-response';

export async function returnUsersList(req: Request, res: Response) {
    console.log((req as AuthRequest).user);
    try {
        const newUser = new UsersServ();
        const response = await newUser.getAllUsers();
        return APIResponse.sucess(res, response, 201);
    } catch (e: any) {
        // console.log(e);
        return APIResponse.error(res, (e as Error).message);
    }
}

export async function register(req: Request, res: Response) {
    const userData: IUser = req.body;
    try {
        const newUser = new UsersServ();
        const response = await newUser.addUser(userData);
        // console.log(userData)
        const user_id = response.data.id;
        const is_admin = response.data.is_admin;
        const token = jwt.sign({ id: user_id, is_admin }, hashSecret, {
            expiresIn: '1800s',
        });
        const timer = 900000;
        res.cookie('token', token, { maxAge: timer, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } catch (e: any) {
        // console.log(e);
        return APIResponse.error(res, (e as Error).message);
    }
}

export async function login(req: Request, res: Response) {
    const userData: ILogin = req.body;
    try {
        const newUser = new UsersServ();
        const response = await newUser.login(userData);
        // console.log(userData)
        const user_id = response.data.id;
        const is_admin = response.data.is_admin;
        const token = jwt.sign({ id: user_id, is_admin }, hashSecret, {
            expiresIn: '1800s',
        });
        const timer = 900000;
        res.cookie('token', token, { maxAge: timer, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } catch (e: any) {
        // console.log(e);
        return APIResponse.error(res, (e as Error).message);
    }
}
