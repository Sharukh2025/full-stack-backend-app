import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
  const env = process.env.NODE_ENV;
  let JWT_ACCESS_TOKEN_SECRET;

  if (env === 'production') JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_PROD;
  else if (env === 'staging') JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_STAGING;
  else if (env === 'development') JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_DEV;
  else JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_DEV_LOCAL;
  // Using authorization header
  // -----------------------------
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).send({
  //     error: 'Access denied. Token is missing.'
  //   });
  // }

  // const token = authHeader.split(' ')[1];

  // Using cookies
  // --------------
  const token = req.cookies.accessToken;

  if (!token) { // No access token
    return res.status(401).send({
      error: 'Access denied. Token is missing.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET); // decode access token
    req.user = decoded; // attach decoded user info to request
    next();
  } catch (err) { // Invalid oe expired access token
    debugger
    return res.status(401).send({
      error: 'Invalid or expired token'
    });
  }
};

export { jwtAuth };
