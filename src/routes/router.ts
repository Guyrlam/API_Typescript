import { Router } from 'express';
import { register } from '../controllers/users';

const route = Router();

route.post('/users/', register);
route.get('/users/:user_id ');
route.patch('/users/:user_id');

export { route };
