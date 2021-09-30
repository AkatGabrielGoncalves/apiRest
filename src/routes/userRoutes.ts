import { Router } from 'express';
import userController from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/user', userController.index);

export default userRouter;
