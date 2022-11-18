import { Request, Response } from 'express';
import TeamsServ from '../services/teams';
import { ITeams, ITeamsUpdate } from '../interfaces/iteams';
import { AuthRequest } from '../interfaces/irequest';
import jwt from 'jsonwebtoken';
import { hashSecret } from '../config';
import { APIResponse } from '../utils/api-response';

async function registerTeam(req: Request, res: Response) {
    const service = new TeamsServ();
    const response = await service.addTeams(req.body);

    if (response.err === null) {
        return APIResponse.sucess(res, response, 201);
    } else {
        return APIResponse.error(res, response.err);
    }
}

async function UpdateTeam(req: Request, res: Response) {
    const team: ITeamsUpdate = req.body;
    const id = req.params.team_id;
    const idUser = (req as AuthRequest).user.squad;
    const is_admin = (req as AuthRequest).user.is_admin;
    console.log(idUser);
    try {
        if (id != idUser || is_admin) {
            throw new Error('500|Você não pode Alterar esta conta');
        }
        const service = new TeamsServ();
        const response = await service.UpdateTeams(team, id);

        if (response.err === null) {
            return APIResponse.sucess(res, response, 201);
        } else {
            return APIResponse.error(res, response.err);
        }
    } catch (err: any) {
        return APIResponse.error(res, (err as Error).message);
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

async function removeMember(req: Request, res: Response) {
    const service = new TeamsServ();
    const response = await service.removeMember(
        req.params.team_id,
        req.params.user_id
    );

    if (response.err === null) {
        return APIResponse.sucess(res, response, 201);
    } else {
        return APIResponse.error(res, response.err);
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

async function addMember(req: Request, res: Response) {
    const service = new TeamsServ();
    const response = await service.addMember(req.params.team_id, req.params.user_id);

    if (response.err === null) {
        return APIResponse.sucess(res, response, 201);
    } else {
        return APIResponse.error(res, response.err);
    }
}

export {
    registerTeam,
    returnTeam,
    delTeam,
    getTeam,
    removeMember,
    addMember,
    UpdateTeam,
};
