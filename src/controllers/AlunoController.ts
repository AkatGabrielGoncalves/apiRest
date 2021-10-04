import express from 'express';
import Aluno from '../database/models/Aluno';
import IController from './interfaces/IController';

class AlunoController implements IController {
  getAll = async (req: express.Request, res: express.Response) => {
    const { page, perPage } = req.body;

    const alunos = await Aluno.findAll({
      offset: page * perPage,
      limit: perPage,
    });

    if (!alunos) return res.status(404).json({ error: 'Não há alunos.' });

    return res.status(200).json(alunos);
  };

  getOne = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    try {
      const aluno = await Aluno.findOne({
        where: { id },
      });

      if (!aluno) return res.status(404).json({ error: 'Aluno não existe.' });

      return res.status(200).json(aluno);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  create = async (req: express.Request, res: express.Response) => {
    const { nome, sobrenome, email, idade, altura, peso } = req.body;
    try {
      const aluno = await Aluno.create({
        nome,
        sobrenome,
        email,
        idade,
        altura,
        peso,
      });

      return res.status(200).json(aluno);
    } catch (err: any) {
      if (err.errors) {
        return res.status(400).json({
          error: err.errors.map((e: any) => e.message),
        });
      }
      return res.status(400).json({ error: err.message });
    }
  };

  delete = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    try {
      const aluno = await Aluno.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
      });

      if (!aluno) return res.status(404).json({ error: 'Usuário não existe.' });

      await aluno.destroy();

      return res.status(200).json(aluno);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  update = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const { nome, sobrenome, email, idade, altura, peso } = req.body;

    try {
      const aluno = await Aluno.findOne({ where: { id } });

      if (!aluno) return res.status(404).json({ error: 'Aluno não existe.' });

      await aluno.update({
        nome,
        sobrenome,
        email,
        idade,
        altura,
        peso,
      });

      return res.status(200).json(aluno);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export default new AlunoController();
