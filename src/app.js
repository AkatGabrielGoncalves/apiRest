import express from 'express';

import homeRouter from './routes/homeRoutes';

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
    this.use(homeRouter);
  };
}

export default new App();
