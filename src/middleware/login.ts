import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { hashSecret } from '../config';
import { APIResponse } from '../utils/api-response';

export async function verifyAdmToken(
    req: Request,
    res: Response,
    next: any
): Promise<any> {
    try {
        const decode = jwt.verify(req.cookies.token, hashSecret);
        if (!decode.is_admin) {
            throw new Error('Visualização não autorizada!');
        }
        next();
    } catch (e) {
        return APIResponse.error(res, (e as Error).message);
    }
}
