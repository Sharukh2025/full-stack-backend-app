import express from 'express';

import { registerController } from './register.controller.js';

const registerRouter = express.Router();

registerRouter.post('/register', registerController);

export { registerRouter }