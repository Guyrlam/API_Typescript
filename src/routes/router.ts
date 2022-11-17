import { Router } from 'express';
import {
    register,
    returnUsersList,
    getUserId,
    updateUser,
    logUser,
    ownUser,
} from '../controllers/users';
import authenticateToken from '../middleware/authtenticate';
import {
    registerTeam,
    returnTeam,
    delTeam,
    getTeam,
    removeMember,
    addUserTeam,
} from '../controllers/teams';
import { verifyAdmToken, verifyLeaderSquad, verifySquad } from '../middleware/login';

const route = Router();

route.post('/login/', logUser);
route.post('/users/', register);
route.get('/users/me', authenticateToken, ownUser);
route.get('/users', authenticateToken, verifyAdmToken, returnUsersList);
route.get('/users/:user_id', getUserId);
route.patch('/users/:user_id', authenticateToken, updateUser);

route.post('/team/', authenticateToken, verifyAdmToken, registerTeam);
route.post(
    '/team/:team_id/member/:user_id',
    authenticateToken,
    verifyAdmToken,
    registerTeam
);
route.get('/team/:team_id', verifySquad, getTeam);
route.get('/team/', verifyAdmToken, returnTeam);
route.patch('/team/:team_id');
route.delete('/team/:team_id', verifyAdmToken, delTeam);
route.delete('/team/:team_id/member/:user_id', verifyLeaderSquad, removeMember);

export { route };
