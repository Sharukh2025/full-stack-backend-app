import express from 'express';
import { loginController } from './login.controller.js';

const loginRouter = express.Router();

loginRouter.post('/login', loginController);

export { loginRouter }