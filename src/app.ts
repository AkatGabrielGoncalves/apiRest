/* eslint-disable import/first */
require('dotenv').config();

import express from 'express';
import Database from './database';

import homeRouter from './routes/HomeRouter';
import alunoRouter from './routes/AlunoRouter';
import userRouter from './routes/UserRouter';
import authRouter from './routes/AuthRouter';

class App {
  public app: express.Application;

  db: typeof Database;

  constructor() {
    this.app = express();
    this.db = Database;
    this.middlewares();
    this.routes();
  }

  private middlewares = () => {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  };

  private routes = () => {
    this.app.use('/auth', authRouter);
    this.app.use('/aluno/', alunoRouter);
    this.app.use('/user/', userRouter);
  };
}

export default new App().app;
