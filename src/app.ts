/* eslint-disable import/first */
require('dotenv').config();

import express from 'express';

import homeRouter from './routes/homeRoutes';
import alunoRouter from './routes/alunoRoutes';
import userRouter from './routes/userRoutes';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares = () => {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  };

  private routes = () => {
    // this.use(homeRouter);
    this.app.use(userRouter);
  };
}

export default new App().app;
