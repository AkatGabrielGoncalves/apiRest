import express, { Router } from 'express';
import userController from '../controllers/UserController';

class UserRouter {
  router: express.Router;

  constructor() {
    this.router = Router();
    this.router.get('/', userController.getAll);
    this.router.get('/:id', userController.getOne);
    this.router.post('/create', userController.create);
    this.router.delete('/delete/:id', userController.delete);
    this.router.put('/update/:id', userController.update);
  }
}

export default new UserRouter().router;
