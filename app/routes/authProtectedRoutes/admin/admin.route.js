import express from 'express';
import { jwtAuth } from '../../../middlewares/jwtAuth.js';
import { adminGetController } from './admin.controller.js';

const adminRouter = express.Router();

// Get All Users(Admin Only)
// You can also create an admin - only route:
adminRouter.get('/admin', jwtAuth, adminGetController);

export { adminRouter }

// Key Points
// 	1. Middleware is the gatekeeper → only authenticated users pass
// 	2. CRUD operations are done using Mongoose methods:
// 		○ findById → read
// 		○ findByIdAndUpdate → update
// 		○ findByIdAndDelete → delete
// 	3. Always hide password before sending response
// Error handling ensures server doesn’t crash on invalid operations