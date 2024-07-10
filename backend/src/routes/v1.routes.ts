import express from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';

const v1Router = express.Router();

v1Router.use('/user', authenticationMiddleware, userRouter);
v1Router.use('/auth', authRouter);

export default v1Router;
