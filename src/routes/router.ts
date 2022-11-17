import { Router } from 'express';
import {
    register,
    returnUsersList,
    getUserId,
    updateUser,
    logUser,
    returnMe,
    delUser,
} from '../controllers/users';
import authenticateToken from '../middleware/authtenticate';
import {
    registerTeam,
    returnTeam,
    delTeam,
    getTeam,
    removeMember,
} from '../controllers/teams';
import {
    verifyAdmToken,
    verifyLeader,
    verifyLeaderSquad,
    verifySquad,
} from '../middleware/login';

const route = Router();

route.post('/login/', logUser);
route.post('/users/', register);
route.get('/users/me', authenticateToken, returnMe);
route.get('/users', verifyAdmToken, returnUsersList);
route.get('/users/:user_id', verifyLeader, getUserId);
route.patch('/users/:user_id', authenticateToken, updateUser);
route.delete('/users/:user_id', verifyAdmToken, delUser);
route.post('/team/', verifyAdmToken, registerTeam);
route.post('/team/:team_id/member/:user_id');
route.get('/team/:team_id', verifySquad, getTeam);
route.get('/team/', verifyAdmToken, returnTeam);
route.patch('/team/:team_id');
route.delete('/team/:team_id', verifyAdmToken, delTeam);
route.delete('/team/:team_id/member/:user_id', verifyLeaderSquad, removeMember);

export { route };
