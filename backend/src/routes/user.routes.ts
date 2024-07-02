import express from 'express';
import { addUser, deleteUser, getUser, getUsers } from '../controllers/user.controller';
import { uploadSingle } from '../middlewares/multer.middleware';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', uploadSingle, addUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
