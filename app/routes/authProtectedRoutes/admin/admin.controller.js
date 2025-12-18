import { adminGetService } from "./admin.service.js";

const adminGetController = async (req, res, next) => {
    try {
        const users = await adminGetService(req)
        res.json(users);
    } catch (err) {
        next(err)
    }
};

export { adminGetController }


