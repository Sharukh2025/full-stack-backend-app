import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { errorTestRouter } from './routes/errorTestRoutes/errorTest.routes.js';
import { registerRouter } from './routes/registerRoute/register.route.js';
import { loginRouter } from './routes/authRoutes/login/login.route.js';
import { refreshRouter } from './routes/authRoutes/refresh/refresh.route.js';
import { logoutRouter } from './routes/authRoutes/logout/logout.route.js';
import { profileRouter } from './routes/authProtectedRoutes/profile/profile.routes.js';
import { adminRouter } from './routes/authProtectedRoutes/admin/admin.route.js';
import { mainErrorHandler } from './middlewares/mainErrorHanlder.js';
import { connectDB } from './config/connectDB.js';

const app = express(); // Create express app

/* ---------- Global Security Middlewares ---------- */
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

/* ------ Cookie Parser Middleware -------- */
app.use(cookieParser());

/* ---------- Body Parser Middleware ---------- */
app.use(express.json());

/* ---------- Rate Limiting Middleware---------- */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

/* ---------- Routes ---------- */
// Test route to check server running or not
app.get('/api/v1', (req, res) => {
  res.send('Server is running!');
});

// Error test routes to check main error handler middleware working or not
app.use('/api/v1', errorTestRouter);

// Auth routes
app.use('/api/v1', registerRouter);
app.use('/api/v1', loginRouter);
app.use('/api/v1', refreshRouter)

// Auth protected Routes
app.use('/api/v1', logoutRouter)
app.use('/api/v1', profileRouter)
app.use('/api/v1', adminRouter)

/* ---------- Main Error Handler Middleware (ALWAYS LAST) ---------- */
app.use(mainErrorHandler);

const env = process.env.NODE_ENV;

let PORT;
if (env === 'production') { PORT = process.env.PORT_PROD }
else if (env === 'staging') { PORT = process.env.PORT_STAGING }
else if (env === 'development') { PORT = process.env.PORT_DEV }
else { PORT = process.env.PORT_DEV_LOCAL };

/* ---------- Connecting to DB & Starting Server ---------- */
const startServer = async () => {
  try {
    await connectDB(); // Connect DB before starting server

    app.listen(PORT, () => { // Start the server at some port which serves our express app
      console.log(`My Express App Server running on http://localhost:${PORT} (${env})`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
    //Force-Stop Node.js App - when somethig went wrong at starting the server
    //Ex:- DB connection error etc.
  }
};

startServer();
