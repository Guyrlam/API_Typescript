import { Request, Response } from 'express';
import UsersServ from '../services/users';
import { IUser, ILogin } from '../interfaces/iuser';
import { AuthRequest } from '../interfaces/irequest';
import jwt from 'jsonwebtoken';
import { hashSecret } from '../config';
import { APIResponse } from '../utils/api-response';
import { IUserUpdate } from '../interfaces/iuserUpd';

export async function logUser(req: Request, res: Response) {
    const service = new UsersServ();
    const response = await service.login(req.body);

    if (response.err === null) {
        const token = jwt.sign(response.payload, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(
            res,
            { mensagem: 'usuário conectado com sucesso' },
            201
        );
    } else {
        return APIResponse.error(res, (response.err as Error).message);
    }
}

export async function returnUsersList(req: Request, res: Response) {
    console.log((req as AuthRequest).user);
    try {
        const payload = (req as AuthRequest).user;
        delete payload.exp;
        const newUser = new UsersServ();
        const response = await newUser.getAllUsers();
        const token = jwt.sign(payload, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } catch (e: any) {
        console.log('AAAAA', e);
        return APIResponse.error(res, (e as Error).message);
    }
}

export async function returnMe(req: Request, res: Response) {
    try {
        const payload = (req as AuthRequest).user;
        delete payload.exp;
        const newUser = new UsersServ();
        const response = await newUser.getUserId(payload.id);
        const token = jwt.sign(payload, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        delete response.result.password;
        return APIResponse.sucess(res, response.result, 201);
    } catch (e: any) {
        return APIResponse.error(res, (e as Error).message);
    }
}

export async function register(req: Request, res: Response) {
    const userData: IUser = req.body;
    try {
        const newUser = new UsersServ();
        const response = await newUser.addUser(userData);
        delete response.data.password;
        return APIResponse.sucess(res, response.data, 201);
    } catch (e: any) {
        return APIResponse.error(res, (e as Error).message);
    }
}

/* export async function login(req: Request, res: Response) {
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
} */

export async function getUserId(req: Request, res: Response) {
    const id = req.params.user_id;
    try {
        const payload = (req as AuthRequest).user;
        delete payload.exp;
        const newUser = new UsersServ();
        const response = await newUser.getUserId(id);
        const token = jwt.sign(payload, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } catch (e: any) {
        return APIResponse.error(res, (e as Error).message);
    }
}

export async function updateUser(req: Request, res: Response) {
    const userData: IUserUpdate = req.body;
    const id = req.params.user_id;
    try {
        const payload = (req as AuthRequest).user;
        delete payload.exp;
        const newUser = new UsersServ();
        const response = await newUser.updateUser(userData, id);
        const token = jwt.sign(payload, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } catch (e: any) {
        return APIResponse.error(res, (e as Error).message);
    }
}

export async function delUser(req: Request, res: Response) {
    try {
        const payload = (req as AuthRequest).user;
        delete payload.exp;
        const newUser = new UsersServ();
        const response = await newUser.delUser(req.params.user_id);
        const token = jwt.sign(payload, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } catch (e: any) {
        return APIResponse.error(res, (e as Error).message);
    }
}
