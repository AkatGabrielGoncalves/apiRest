import { Router } from 'express';
import alunoController from '../controllers/AlunoController';

const alunoRouter = Router();

alunoRouter.get('/', alunoController.index);

export default alunoRouter;
