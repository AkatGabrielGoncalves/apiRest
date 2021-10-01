import { Router } from 'express';
import alunoController from '../controllers/AlunoController';

const alunoRouter = Router();

alunoRouter.get('/', alunoController.getAll);
alunoRouter.get('/:id', alunoController.getOne);
alunoRouter.post('/create', alunoController.create);
alunoRouter.delete('/delete/:id', alunoController.delete);
alunoRouter.put('/update/:id', alunoController.update);

export default alunoRouter;
