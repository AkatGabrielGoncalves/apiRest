import express from 'express';
import Database from '../database';
import Controller from './interfaces/Controller';

class AlunoController implements Controller {
  index = async (req: express.Request, res: express.Response) => {
    const novoAluno = await Database.models.Aluno.create({
      nome: 'Gabriel',
      sobrenome: 'hmm',
      email: 'sdsads@sd.com',
      idade: 55,
      peso: 35.4,
      altura: 2.5,
    });
    res.json(novoAluno);
  };
}

export default new AlunoController();
