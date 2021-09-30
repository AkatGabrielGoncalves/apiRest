import { Router } from 'express';
import alunoController from '../controllers/AlunoController';

const alunoRouter = new Router();

alunoRouter.get('/', alunoController.index);

export default alunoRouter;
