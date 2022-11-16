import { Router } from 'express';
import { register } from '../controllers/users';

const route = Router();

route.post('/users/', register);
route.get('/users');
route.get('/users/:user_id');
route.get('/users/me');
route.patch('/users/:user_id');

export { route };
