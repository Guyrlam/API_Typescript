import { Router } from 'express';
import {
    register,
    returnUsersList,
    getUserId,
    updateUser,
    login,
} from '../controllers/users';
import authenticateToken from '../middleware/authtenticate';
import {
    registerTeam,
    returnTeam,
    delTeam,
    getTeam,
    removeMember,
} from '../controllers/teams';
import { verifyAdmToken, verifyLeaderSquad, verifySquad } from '../middleware/login';

const route = Router();

//route.post('/login/', logUser);
route.post('/users/', register);
route.get('/users', verifyAdmToken, returnUsersList);
route.get('/users/:user_id', getUserId);
route.get('/users/me');
route.patch('/users/:user_id', updateUser);
route.post('/users/login', login);

route.post('/team/', registerTeam);
route.get('/team/:team_id', verifySquad, getTeam);
route.get('/team/', verifyAdmToken, returnTeam);
route.patch('/team/:team_id');
route.delete('/team/:team_id', verifyAdmToken, delTeam);
route.delete('/team/:team_id/member/:user_id', verifyLeaderSquad, removeMember);

export { route };
