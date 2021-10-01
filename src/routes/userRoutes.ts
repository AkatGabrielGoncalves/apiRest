import { Router } from 'express';
import userController from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getOne);
userRouter.post('/create', userController.create);
userRouter.delete('/delete/:id', userController.delete);
userRouter.put('/update/:id', userController.update);

export default userRouter;
