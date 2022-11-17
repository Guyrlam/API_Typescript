import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { hashSecret } from '../config';
import { AuthRequest } from '../interfaces/irequest';

export default function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies['token'];
    if (token) {
        if (token === null) {
            return res.sendStatus(401);
        }
        jwt.verify(token, hashSecret, (err: any, user: any) => {
            if (err) return res.sendStatus(403);
            (req as AuthRequest).user = user;
            next();
        });
    } else {
        return res.sendStatus(401);
    }
}
