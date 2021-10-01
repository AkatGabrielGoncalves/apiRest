import express from 'express';
import Controller from './interfaces/Controller';

class HomeController implements Controller {
  getAll = async (req: express.Request, res: express.Response) => {
    res.json({
      ola: 'mundo',
    });
  };

  getOne = async (req: express.Request, res: express.Response) => {};

  create = async (req: express.Request, res: express.Response) => {};

  delete = async (req: express.Request, res: express.Response) => {};

  update = async (req: express.Request, res: express.Response) => {};
}

export default new HomeController();
