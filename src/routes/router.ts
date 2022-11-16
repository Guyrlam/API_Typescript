import { Router } from 'express';
import { register, returnUsersList, login } from '../controllers/users';
import authenticateToken from '../middleware/authtenticate';

const route = Router();

route.post('/users/', register);
route.post('/users/login', login);
route.get('/users/', authenticateToken, returnUsersList);
route.patch('/users/:user_id');

export { route };
