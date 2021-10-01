import express from 'express';

export default interface IController {
  getAll: (req: express.Request, res: express.Response) => Promise<any>;
  getOne: (req: express.Request, res: express.Response) => Promise<any>;
  create: (req: express.Request, res: express.Response) => Promise<any>;
  delete: (req: express.Request, res: express.Response) => Promise<any>;
  update: (req: express.Request, res: express.Response) => Promise<any>;
}
