import { Router } from 'express';
import { register, returnUsersList } from '../controllers/users';
import { verifyAdmToken } from '../middleware/login';

const route = Router();

route.post('/users/', register);
route.get('/users', verifyAdmToken, returnUsersList);
route.get('/users/:user_id');
route.get('/users/me');
route.patch('/users/:user_id');

route.post('/team/', register);
route.get('/team/:team_id');
route.get('/team/');
route.patch('/team/:team_id');
route.delete('/team/:team_id');

export { route };
