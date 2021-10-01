import { Router } from 'express';
import homeController from '../controllers/HomeController';

const homeRouter = Router();

homeRouter.get('/', homeController.getAll);

export default homeRouter;
