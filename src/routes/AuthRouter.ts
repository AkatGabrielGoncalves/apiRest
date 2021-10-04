import express, { Router } from 'express';
import authController from '../controllers/AuthController';

class AuthRouter {
  router: express.Router;

  constructor() {
    this.router = Router();
    this.router.post('/', authController.create);
  }
}

export default new AuthRouter().router;
