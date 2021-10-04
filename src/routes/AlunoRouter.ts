import express, { Router } from 'express';
import alunoController from '../controllers/AlunoController';

class AlunoRouter {
  router: express.Router;

  constructor() {
    this.router = Router();
    this.router.get('/', alunoController.getAll);
    this.router.get('/:id', alunoController.getOne);
    this.router.post('/create', alunoController.create);
    this.router.delete('/delete/:id', alunoController.delete);
    this.router.put('/update/:id', alunoController.update);
  }
}

export default new AlunoRouter().router;
