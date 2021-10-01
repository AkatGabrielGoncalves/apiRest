import express from 'express';
import { password } from '../config/database';
import Aluno from '../database/models/Aluno';
import Controller from './interfaces/Controller';

class AlunoController implements Controller {
  getAll = async (req: express.Request, res: express.Response) => {
    const { page, perPage } = req.body;

    const alunos = await Aluno.findAll({
      offset: page * perPage,
      limit: perPage,
    });

    res.json(alunos);
  };

  getOne = async (req: express.Request, res: express.Response) => {};

  create = async (req: express.Request, res: express.Response) => {};

  delete = async (req: express.Request, res: express.Response) => {};

  update = async (req: express.Request, res: express.Response) => {};
}

export default new AlunoController();
