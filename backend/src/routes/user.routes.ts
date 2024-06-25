import express from 'express';
import { addUser, getUsers } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', addUser);


export default userRouter;
