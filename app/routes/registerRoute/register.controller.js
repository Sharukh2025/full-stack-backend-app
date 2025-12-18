import { registerService } from "./register.service.js";

const registerController = async (req, res, next) => {
  try {
    const user = await registerService(req.body); // Calling register service
    res.status(201).send(user); // Sending response to client
  } catch (err) {
    next(err); // Passing error to main error handler middleware
  }
};

export { registerController }