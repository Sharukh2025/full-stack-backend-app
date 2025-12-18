import express from 'express';
import { logoutController } from './logout.controller.js';


const logoutRouter = express.Router();

logoutRouter.post('/logout', logoutController);

export { logoutRouter }