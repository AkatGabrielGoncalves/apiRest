import express from 'express';
import Database from '../database';
import Controller from './interfaces/Controller';

class AlunoController implements Controller {
  index = async (req: express.Request, res: express.Response) => {
    const user = await Database.models.User.create({
      nome: 'Gabriel',
      email: 'gabriel@gabriel.com',
      tempPassword: 'teste123',
    });
    res.json(user);
  };
}

export default new AlunoController();
