import { Dialect, Model, ModelCtor, Sequelize } from 'sequelize';
import database from '../config/database';
import Aluno, { AlunoAttributes } from './models/Aluno';
import User, { UserAttributes } from './models/User';

export interface DatabaseConfigAttributes {
  dialect: Dialect;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  define: {
    timestamps: boolean;
    underscore: boolean;
    underscoredAll: boolean;
    createdAt: string;
    updatedAt: string;
  };
  timezone: string;
}

export type IModels = {
  Aluno: ModelCtor<Model<AlunoAttributes>>;
  User: ModelCtor<Model<UserAttributes>>;
};

class Database extends Sequelize {
  baseModels: (typeof Aluno | typeof User)[];

  models!: IModels;

  constructor() {
    super(database as DatabaseConfigAttributes);
    this.baseModels = [Aluno, User];
    this.initModels();
  }

  private initModels = () => {
    this.baseModels.forEach((model) => {
      model.initialize(this);
    });
  };
}

export default new Database();
