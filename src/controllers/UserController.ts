import express from 'express';
import User from '../database/models/User';
import Controller from './interfaces/Controller';

class AlunoController implements Controller {
  getAll = async (req: express.Request, res: express.Response) => {
    const { page, perPage } = req.body;

    const user = await User.findAll({
      offset: page * perPage,
      limit: perPage,
      attributes: {
        exclude: ['password'],
      },
    });
    res.json(user);
  };

  getOne = async (req: express.Request, res: express.Response) => {};

  create = async (req: express.Request, res: express.Response) => {
    const { nome, email, tempPassword } = req.body;
    try {
      const user = await User.create({
        nome,
        email,
        tempPassword,
      });

      res.status(200).json(user);
    } catch (e: any) {
      if (e.original.errno === 1062) {
        res.status(400).json({ error: 'Email já existe.' });
      } else {
        res.status(400).json({ error: e.message });
      }
    }
  };

  delete = async (req: express.Request, res: express.Response) => {};

  update = async (req: express.Request, res: express.Response) => {};
}

export default new AlunoController();
