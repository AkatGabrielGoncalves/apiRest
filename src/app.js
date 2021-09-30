/* eslint-disable import/first */
require('dotenv').config();

import express from 'express';
import Database from './database';

import homeRouter from './routes/homeRoutes';
import alunoRouter from './routes/alunoRoutes';

class App extends express {
  constructor() {
    super();
    this.middlewares();
    this.routes();
  }

  middlewares = () => {
    this.use(express.urlencoded({ extended: true }));
    this.use(express.json());
  };

  routes = () => {
    // this.use(homeRouter);
    this.use(alunoRouter);
  };
}

export default new App();
