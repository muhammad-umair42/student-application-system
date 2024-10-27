import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { startJobs } from './jobs/cronJobs.js';
import applicationRouter from './routes/application-routes.js';
import authRouter from './routes/auth-routes.js';
import userRouter from './routes/user-routes.js';
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
startJobs();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/applications', applicationRouter);

export { app };
