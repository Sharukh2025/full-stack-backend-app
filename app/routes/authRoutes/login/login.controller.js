import { loginService } from "./login.service.js";

const loginController = async (req, res, next) => {
    try {
        const result = await loginService(req.body);
        const { accessToken, refreshToken } = result
        // Access token cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false, // true in production (HTTPS)
            maxAge: 15 * 60 * 1000,
            path: "/"
        });
        // Refresh token cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });
        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

export { loginController }
