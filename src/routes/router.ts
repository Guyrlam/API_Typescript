import { Router } from "express";

const route = Router();

route.get('/users/:user_id');
route.patch('/users/:user_id');

export { route }