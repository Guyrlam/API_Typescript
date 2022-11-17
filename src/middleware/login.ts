import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { hashSecret } from '../config';
import { APIResponse } from '../utils/api-response';

type JWTPayload = {
    id: string;
    is_admin: boolean;
    squad: string;
    leaderSquad: null | string;
};

export async function verifyAdmToken(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | APIResponse> {
    try {
        const decode = jwt.verify(req.cookies.token, hashSecret) as JWTPayload;
        if (!decode.is_admin) {
            throw new Error('500|Operação não autorizada!');
        }
        req.cookies = {
            id: decode.id,
            is_admin: decode.is_admin,
            squad: decode.squad,
            leaderSquad: decode.leaderSquad,
        };
        next();
    } catch (e) {
        return APIResponse.error(res, (e as Error).message);
    }
}

export async function verifySquad(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | APIResponse> {
    try {
        const decode = jwt.verify(req.cookies.token, hashSecret) as JWTPayload;
        if (!decode.is_admin && decode.squad !== req.params.team_id) {
            throw new Error('Operação não autorizada!');
        }
        req.cookies = {
            id: decode.id,
            is_admin: decode.is_admin,
            squad: decode.squad,
            leaderSquad: decode.leaderSquad,
        };
        next();
    } catch (e) {
        return APIResponse.error(res, (e as Error).message);
    }
}

export async function verifyLeaderSquad(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | APIResponse> {
    try {
        const decode = jwt.verify(req.cookies.token, hashSecret) as JWTPayload;
        if (!decode.is_admin && decode.leaderSquad !== req.params.team_id) {
            throw new Error('Operação não autorizada!');
        }
        req.cookies = {
            id: decode.id,
            is_admin: decode.is_admin,
            squad: decode.squad,
            leaderSquad: decode.leaderSquad,
        };
        next();
    } catch (e) {
        return APIResponse.error(res, (e as Error).message);
    }
}

export async function verifyLeader(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | APIResponse> {
    try {
        const decode = jwt.verify(req.cookies.token, hashSecret) as JWTPayload;
        if (!decode.is_admin && decode.leaderSquad === null) {
            throw new Error('Operação não autorizada!');
        }
        req.cookies = {
            id: decode.id,
            is_admin: decode.is_admin,
            squad: decode.squad,
            leaderSquad: decode.leaderSquad,
        };
        next();
    } catch (e) {
        return APIResponse.error(res, (e as Error).message);
    }
}
