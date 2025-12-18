import { profileDeleteService, profileGetService, profilePutService } from "./profile.service.js";

const profileGetController = async (req, res, next) => {
    try {
        const user = await profileGetService(req)
        res.send(user);
    } catch (err) {
        next(err)
    }
};

const profilePutController = async (req, res, next) => {
    try {
        const user = await profilePutService(req)
        res.send(user);
    } catch (err) {
        next(err)
    }
};

const profileDeleteController = async (req, res, next) => {
    try {
        await profileDeleteService(req)
        res.send({ message: 'User deleted successfully' });
    } catch (err) {
        next(err)
    }
};

export { profileGetController, profilePutController, profileDeleteController }
