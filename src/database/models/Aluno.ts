import { DataTypes, Model, Sequelize } from 'sequelize';
import { dialect } from '../../config/database';

export interface IAlunoAttributes {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  idade: number;
  peso: number;
  altura: number;
}

export default class Aluno
  extends Model<IAlunoAttributes>
  implements IAlunoAttributes
{
  public id!: number;

  public nome!: string;

  public sobrenome!: string;

  public email!: string;

  public idade!: number;

  public peso!: number;

  public altura!: number;

  static initialize = (sequelize: Sequelize) => {
    this.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sobrenome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            name: dialect === 'mysql' ? 'alunos.email' : 'email',
            msg: 'Email já cadastrado.',
          },
        },
        idade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        peso: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        altura: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'alunos',
      }
    );
  };
}
