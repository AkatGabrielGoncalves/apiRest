import express from 'express';
import bcrypt from 'bcrypt';
import User from '../database/models/User';
import IController from './interfaces/IController';

class UserController implements IController {
  getAll = async (req: express.Request, res: express.Response) => {
    const { page, perPage } = req.body;

    if (typeof perPage !== 'number' || typeof page !== 'number')
      return res.status(400).json({ error: ['page and perPage are not numbers.'] });

    try {
      const users = await User.findAll({
        offset: page * perPage,
        limit: perPage,
        attributes: {
          exclude: ['password'],
        },
      });

      if (!users) return res.status(404).json({ error: 'Não há usuários.' });

      return res.status(200).json(users);
    } catch (err: any) {
      return this.errorHandler(res, err);
    }
  };

  getOne = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
      });

      if (!user) return res.status(404).json({ error: 'Usuário não existe.' });

      return res.status(200).json(user);
    } catch (err: any) {
      return this.errorHandler(res, err);
    }
  };

  create = async (req: express.Request, res: express.Response) => {
    const { nome, email, tempPassword } = req.body;
    try {
      const user = await User.create({
        nome,
        email,
        tempPassword,
      });

      return res
        .status(200)
        .json({ id: user.id, nome: user.nome, email: user.email });
    } catch (err: any) {
      return this.errorHandler(res, err);
    }
  };

  delete = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
      });

      if (!user) return res.status(404).json({ error: 'Usuário não existe.' });

      await user.destroy();

      return res.status(200).json(user);
    } catch (err: any) {
      return this.errorHandler(res, err);
    }
  };

  update = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const { nome, email, tempPassword } = req.body;

    try {
      const user = await User.findOne({
        where: { id },
      });

      if (!user) return res.status(404).json({ error: 'Usuário não existe.' });

      const wasNameModified = nome !== user.nome;
      const wasEmailModified = email !== user.email;
      const wasPasswordModified = !bcrypt.compareSync(tempPassword, user.password);

      if (!wasNameModified && !wasEmailModified && !wasPasswordModified)
        return res
          .status(200)
          .json({ id: user.id, nome: user.nome, email: user.email, updated: false });

      const updatedAttributes = {
        nome: wasNameModified ? nome : user.nome,
        email: wasEmailModified ? email : user.email,
      };

      await user.update({
        ...updatedAttributes,
        password: wasPasswordModified
          ? bcrypt.hashSync(tempPassword, 11)
          : user.password,
      });

      return res
        .status(200)
        .json({ id: user.id, ...updatedAttributes, updated: true });
    } catch (err: any) {
      return this.errorHandler(res, err);
    }
  };

  private errorHandler = (res: express.Response, err: any) => {
    if (err.errors) {
      return res.status(400).json({
        error: err.errors.map((e: any) => e.message),
      });
    }
    return res.status(400).json({ error: err.message });
  };
}

export default new UserController();
