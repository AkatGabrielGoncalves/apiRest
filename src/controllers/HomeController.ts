import express from 'express';
import Controller from './interfaces/Controller';

class HomeController implements Controller {
  index = async (req: express.Request, res: express.Response) => {
    res.json({
      ola: 'mundo',
    });
  };
}

export default new HomeController();
