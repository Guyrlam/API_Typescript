import { Router } from 'express';
import { register, returnUsersList } from '../controllers/users';
import { registerTeam, returnTeam, delTeam, getTeam } from '../controllers/teams';
import { verifyAdmToken, verifySquad } from '../middleware/login';

const route = Router();

route.post('/users/', register);
route.get('/users', verifyAdmToken, returnUsersList);
route.get('/users/:user_id');
route.get('/users/me');
route.patch('/users/:user_id');

route.post('/team/', registerTeam);
route.get('/team/:team_id', verifySquad, getTeam);
route.get('/team/', verifyAdmToken, returnTeam);
route.patch('/team/:team_id');
route.delete('/team/:team_id', verifyAdmToken, delTeam);

export { route };
