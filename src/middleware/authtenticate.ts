import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
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
        if (req.params.user_id) {
            const decode = jwt.verify(req.cookies.token, hashSecret) as JwtPayload;
            if (decode.id !== req.params.user_id) return res.sendStatus(401);
        }
        jwt.verify(token, hashSecret, (err: any, user: any) => {
            console.log(user);
            if (err) return res.sendStatus(403);
            (req as AuthRequest).user = user;
            next();
        });
    } else {
        return res.sendStatus(401);
    }
}
