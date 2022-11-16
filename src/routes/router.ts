import { Router } from 'express';
import { register } from '../controllers/users';

const route = Router();

route.post('/users/', register);
route.get('/users/:user_id ');
route.patch('/users/:user_id');

route.post('/team/', register);
route.get('/team/:team_id');
route.get('/team/');
route.patch('/team/:team_id');
route.delete('/team/:team_id');

export { route };
