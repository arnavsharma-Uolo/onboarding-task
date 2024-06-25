import express from 'express';
import { addUser, deleteUser, getUsers } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', addUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
