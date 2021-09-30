import Database from '../database';

class AlunoController {
  async index(req, res) {
    const novoAluno = await Database.models.Aluno.create({
      nome: 'Gabriel',
      sobrenome: 'hmm',
      email: 'sdsads@sd.com',
      idade: 55,
      peso: 35.4,
      altura: 2.5,
    });
    res.json(novoAluno);
  }
}

export default new AlunoController();
