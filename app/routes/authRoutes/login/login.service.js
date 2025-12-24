import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/users.model.js'

const loginService = async (requestBody) => {
  const { email, password } = requestBody // Get data from request body

  const env = process.env.NODE_ENV;
  let JWT_ACCESS_TOKEN_SECRET;
  let JWT_REFRESH_TOKEN_SECRET;

  if (env === 'production') {
    JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_PROD
    JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET_PROD
  }
  else if (env === 'staging') {
    JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_STAGING
    JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET_STAGING
  }
  else {
    JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_DEV_LOCAL
    JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET_DEV_LOCAL
  };

  // Check if user exists or not
  const user = await User.findOne({ email });

  // If user does not exist
  if (!user) {
    const error = {
      message: 'User not found',
      status: 404
    }
    throw error;
  }

  // If user exists
  const isMatch = await bcrypt.compare(password, user.password); // Check if password authentic

  // If password not authentic
  if (!isMatch) {
    const error = {
      message: 'Invalid password',
      status: 401
    }
    throw error;
  }

  // If user exists and password is authentic

  // Access token (short-lived)
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: String(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN) }
  );


  // Refresh token (long-lived)
  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: String(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN) }
  );

  const userResponse = user.toObject(); //Convert user to object

  delete userResponse.password; // Remove password before sending response

  return { // Return response
    message: 'Login success',
    accessToken,
    refreshToken,
    user: userResponse
  };
};

export { loginService }
