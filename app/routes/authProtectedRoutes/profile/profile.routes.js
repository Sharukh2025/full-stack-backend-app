import express from 'express';
import { profileDeleteController, profileGetController, profilePutController } from './profile.controller.js';
import { jwtAuth } from '../../../middlewares/jwtAuth.js';

const profileRouter = express.Router();

// Read, Update, Delete operations on mongodb collection users

// Read
profileRouter.get('/profile', jwtAuth, profileGetController);

// Update
profileRouter.put('/profile', jwtAuth, profilePutController);

// Delete
profileRouter.delete('/profile', jwtAuth, profileDeleteController);

export { profileRouter }