import express, { Router } from 'express';
import userController from '../controllers/UserController';
import userLogin from '../middlewares/UserLogin';

class UserRouter {
  router: express.Router;

  constructor() {
    this.router = Router();
    this.router.get('/', userLogin.authenticate, userController.getAll);
    this.router.get('/:id', userLogin.authenticate, userController.getOne);
    this.router.post('/create', userLogin.authenticate, userController.create);
    this.router.delete('/delete/:id', userLogin.authenticate, userController.delete);
    this.router.put('/update/:id', userLogin.authenticate, userController.update);
  }
}

export default new UserRouter().router;
