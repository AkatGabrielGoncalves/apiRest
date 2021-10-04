import express from 'express';
import auth from '../authentication/Auth';
import User from '../database/models/User';

class UserLogin {
  authenticate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const token = req.headers.authorization || '';

    try {
      const id = auth.verify(token) as string;

      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) return res.status(403).json({ error: ['Usuário não existe.'] });
      req.userData = {
        id,
        email: user.email,
      };
      return next();
    } catch (err: any) {
      return res.status(401).json({ error: ['Token inválido ou expirado'] });
    }
  };
}

export default new UserLogin();
