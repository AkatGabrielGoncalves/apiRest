import express from 'express';
import IController from './interfaces/IController';

class HomeController implements IController {
  getAll = async (req: express.Request, res: express.Response) => {};

  getOne = async (req: express.Request, res: express.Response) => {};

  create = async (req: express.Request, res: express.Response) => {};

  delete = async (req: express.Request, res: express.Response) => {};

  update = async (req: express.Request, res: express.Response) => {};
}

export default new HomeController();
