import { Request, Response } from 'express';
import TeamsServ from '../services/teams';
import { ITeams } from '../interfaces/iteams';
import jwt from 'jsonwebtoken';
import { hashSecret } from '../config';
import { APIResponse } from '../utils/api-response';

async function registerTeam(req: Request, res: Response) {
    const service = new TeamsServ();
    const response = await service.addTeams(req.body);

    if (response.err === null) {
        const token = jwt.sign(req.cookies, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } else {
        return APIResponse.error(res, (response.err as Error).message);
    }
}

async function returnTeam(req: Request, res: Response) {
    const service = new TeamsServ();
    const teamList = await service.getTeams();

    if (teamList.err === null) {
        const token = jwt.sign(req.cookies, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(res, teamList, 201);
    } else {
        return APIResponse.error(res, (teamList.err as Error).message);
    }
}

async function delTeam(req: Request, res: Response) {
    const service = new TeamsServ();
    const response = await service.delTeams(req.params.team_id);

    if (response.err === null) {
        const token = jwt.sign(req.cookies, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } else {
        return APIResponse.error(res, (response.err as Error).message);
    }
}

async function getTeam(req: Request, res: Response) {
    const service = new TeamsServ();
    const response = await service.getTeamById(req.params.team_id);

    if (response.err === null) {
        const token = jwt.sign(req.cookies, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } else {
        return APIResponse.error(res, (response.err as Error).message);
    }
}

export { registerTeam, returnTeam, delTeam, getTeam };
