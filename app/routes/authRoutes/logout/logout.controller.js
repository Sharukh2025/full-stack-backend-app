const logoutController = async (req, res, next) => {
    try {
        res.clearCookie("accessToken", { path: "/" });
        res.clearCookie("refreshToken", { path: "/" });

        res.send({ message: "Logged out" });
    } catch (err) {
        next(err);
    }
};

export { logoutController }
