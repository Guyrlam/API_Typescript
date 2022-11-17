import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { hashSecret } from '../config';
import { APIResponse } from '../utils/api-response';

type JWTPayload = { id: string; is_admin: boolean };

export async function verifyAdmToken(
    req: Request,
    res: Response,
    next: () => void
): Promise<any> {
    try {
        const decode = jwt.verify(req.cookies.token, hashSecret) as JWTPayload;
        if (!decode.is_admin) {
            throw new Error('Visualização não autorizada!');
        }
        req.cookies = {
            id: decode.id,
            is_admin: decode.is_admin,
        };
        next();
    } catch (e) {
        return APIResponse.error(res, (e as Error).message);
    }
}
