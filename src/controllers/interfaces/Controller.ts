import express from 'express';

export default interface Controller {
  index: (req: express.Request, res: express.Response) => Promise<any>;
}
