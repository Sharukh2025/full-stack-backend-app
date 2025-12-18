import jwt from 'jsonwebtoken';

const refreshService = async (req) => {
    const refreshToken = req.cookies.refreshToken; // Get refresh token

    const env = process.env.NODE_ENV;
    let JWT_ACCESS_TOKEN_SECRET;
    let JWT_REFRESH_TOKEN_SECRET;
    if (env === 'production') {
        JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_PROD
        JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET_PROD
    }
    else if (env === 'test') {
        JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_TEST
        JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET_TEST
    }
    else {
        JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_DEV
        JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET_DEV
    };

    // If no refresh token
    if (!refreshToken) {
        const error = {
            message: 'No refresh token',
            status: 401
        }
        throw error;
    }

    // If refresh token present
    const decoded = jwt.verify( // Decode refresh token
        refreshToken,
        JWT_REFRESH_TOKEN_SECRET
    );

    const newAccessToken = jwt.sign( // Create new access token
        { id: decoded.id },
        JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    return newAccessToken; // Return new access token

};

export { refreshService }
