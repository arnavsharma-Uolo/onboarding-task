import express from 'express';
import { loginUser, logoutUser, validateUser } from '../controllers/auth.controller';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';

const authRouter = express.Router();

authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.post('/validate', authenticationMiddleware, validateUser);

export default authRouter;
