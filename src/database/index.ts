import {
  ConnectionRefusedError,
  Dialect,
  Model,
  ModelCtor,
  Sequelize,
} from 'sequelize';
import database from '../config/database';
import Aluno, { IAlunoAttributes } from './models/Aluno';
import User, { IUserAttributes } from './models/User';

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

export type TModels = {
  Aluno: ModelCtor<Model<IAlunoAttributes>>;
  User: ModelCtor<Model<IUserAttributes>>;
};

class Database extends Sequelize {
  baseModels: (typeof Aluno | typeof User)[];

  models!: TModels;

  constructor() {
    super(database as DatabaseConfigAttributes);
    this.verifyConnection();
    this.baseModels = [Aluno, User];
    this.initModels();
  }

  private initModels = () => {
    this.baseModels.forEach((model) => {
      model.initialize(this);
    });
  };

  private verifyConnection = async () => {
    try {
      await this.authenticate();
    } catch (e: any) {
      console.log(`DATABASE FAILED TO ESTABLISH A CONNECTION:`, e.original);
    }
  };
}

export default new Database();
