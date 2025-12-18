import { refreshService } from "./refresh.service.js";

const refreshController = async (req, res, next) => {
    try {
        const newAccessToken = await refreshService(req);

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 15 * 60 * 1000,
            path: "/"
        });
        res.send({ message: "Access token refreshed" });
    } catch (err) {
        next(err);
    }
};

export { refreshController }
