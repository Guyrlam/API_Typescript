import { Request, Response } from 'express';
import TeamsServ from '../services/teams';
import { ITeams } from '../interfaces/iteams';
import jwt from 'jsonwebtoken';
import { hashSecret } from '../config';
import { APIResponse } from '../utils/api-response';

async function registerTeam(req: Request, res: Response) {
    const team: ITeams = req.body;
    const service = new TeamsServ();
    const response = await service.addTeams(team);

    if (response.err === null) {
        return APIResponse.sucess(res, response, 201);
    } else {
        return APIResponse.error(res, response.err);
    }
}

async function addUserTeam(req: Request, res: Response) {
    const id_user = req.params.user_id;
    const id_team = req.params.team_id;
    const service = new TeamsServ();
    const response = await service.addUserTeam(id_user, id_team);

    if (response.err === null) {
        const token = jwt.sign(req.cookies, hashSecret, { expiresIn: '1800s' });
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return APIResponse.sucess(res, response, 201);
    } else {
        console.log(response.err);
        return APIResponse.error(res, response.err);
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
        const erro: string = response.err;
        return APIResponse.error(res, erro);
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

export { registerTeam, returnTeam, delTeam, getTeam, removeMember, addUserTeam };
