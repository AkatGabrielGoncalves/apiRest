import express from 'express';
import bcrypt from 'bcrypt';
import User from '../database/models/User';
import IController from './interfaces/IController';
import auth from '../authentication/Auth';

class AuthController implements IController {
  create = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) return res.status(404).json({ error: ['Usuário não existe.'] });

      if (!bcrypt.compareSync(password, user.password))
        return res.status(404).json({ error: ['Senha incorreta'] });

      const token = auth.sign(`${user.id}`);

      return res.status(200).json({ token });
    } catch (err: any) {
      return res.status(400).json({ error: ['Falha na autenticação'] });
    }
  };
}

export default new AuthController();
