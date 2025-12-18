import express from 'express';
import { refreshController } from './refresh.controller.js';

const refreshRouter = express.Router();

refreshRouter.post('/refresh', refreshController);

export { refreshRouter }