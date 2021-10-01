import express from 'express';
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

  create = async (req: express.Request, res: express.Response) => {
    const { nome, sobrenome, email, idade, altura, peso } = req.body;
    try {
      const user = await Aluno.create({
        nome,
        sobrenome,
        email,
        idade,
        altura,
        peso,
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
